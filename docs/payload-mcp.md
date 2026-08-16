# Payload MCP Server — R&D Notes

Findings from hands-on R&D with `@payloadcms/plugin-mcp` (v3.71.1, Payload 3.x). Covers what the
plugin does, how it works internally, how to configure it, how to connect AI agents to it, and the
gotchas that cost real time.

> The plugin is marked **experimental** by its authors. Several rough edges below are consequences of
> that, not misconfiguration.

---

## 1. What MCP is

The Model Context Protocol is a standard way for an AI client (Claude Code, Claude Desktop, an agent
SDK) to discover and call tools on a server. The client asks the server "what can you do?", receives
a list of tool names with JSON Schemas, and then calls them with JSON arguments. The model chooses
which tool to call; the protocol just carries the schema and the payload.

For a CMS this is a natural fit: an agent that can enumerate collections and call
find/create/update becomes able to author, translate, restructure, and audit content without anyone
writing a bespoke integration.

## 2. What the Payload MCP plugin gives you

The plugin turns your Payload config into an MCP server mounted on your own app.

**Per enabled collection**, up to four tools:

| Tool | Name pattern | Notes |
|---|---|---|
| Find | `find<Collection>` | `id`, `where`, `limit` (default 10, max 100), `page`, `sort`, `locale`, `fallbackLocale`, `draft` |
| Create | `create<Collection>` | every field becomes a top-level parameter |
| Update | `update<Collection>` | `id` or `where`, plus every field as an optional parameter |
| Delete | `delete<Collection>` | `id` or `where` |

**Per enabled global**, two tools — `find<Global>` and `update<Global>`. Globals are singletons, so
there is no create and no delete.

Tool names are the operation plus the camel-cased slug: collection `articles` → `findArticles`,
`createArticles`, `updateArticles`. Global `site` → `findSite`, `updateSite`.

**Beyond CRUD**, the plugin config accepts your own `tools`, `prompts`, and `resources`, each with a
handler that receives the `PayloadRequest` — the escape hatch for domain operations that don't map to
a single collection write ("publish this and revalidate that").

**Experimental tool families** (off by default, and mostly dev-only): collection scaffolding, config
editing, job control, and auth operations. The collection/config/job tools write TypeScript files to
disk.

## 3. How it works behind the scenes

### Request path

```
AI client
  └─ POST /api/mcp          (JSON-RPC over streamable HTTP, Authorization: Bearer <api-key>)
       └─ Payload custom endpoint  (registered by the plugin)
            ├─ auth: hash key → look up payload-mcp-api-keys → resolve linked user
            ├─ build MCP server: register only the tools this key is allowed
            └─ @vercel/mcp-adapter handles the JSON-RPC envelope
                 └─ tool handler → payload.create / update / find / delete (Local API)
                      └─ hooks, access control, validation, revalidation all run normally
```

The endpoint is a plain Payload endpoint, so **the MCP server is your app**. No sidecar process, no
separate port. It shares the running Next.js server, its environment, and its database connection.
It also means MCP writes go through the same Local API as your own code: `beforeChange` /
`afterChange` hooks fire, cache revalidation runs, drafts and versions behave normally.

The plugin sets `req.payloadAPI = 'MCP'`, so hooks and access functions can detect the caller.

`GET /api/mcp` always answers `{"jsonrpc":"2.0","error":{"code":-32000,"message":"Method not
allowed."},"id":null}` even with a valid key. That is intentional — clients must POST.

### Authentication and per-key capability gating

The plugin injects a `payload-mcp-api-keys` collection (admin group **MCP**) with
`useAPIKey: true` and `disableLocalStrategy: true`. Each key document has:

- a **required relationship to a user** — the identity operations run as;
- a **checkbox per capability per entity** — `articles.create`, `articles.find`, `site.update`, and
  so on, plus one per custom tool/prompt/resource.

Incoming keys are matched by `HMAC-SHA256(payload.secret, apiKey)` against the stored `apiKeyIndex`.
On success the linked user is attached with `_strategy = 'mcp-api-key'`.

Two layers of authorization, and both matter:

1. **Capability gating.** Tools are registered *per request*, and only if the key's checkbox is
   ticked. An unchecked capability means the tool is not merely refused — it never appears in the
   client's tool list. Untick a box in the admin and it disappears on the client's next connection.
2. **Payload access control.** Every operation runs with `overrideAccess: false` and the key's user.
   An MCP client can never exceed what that user could do through the admin UI. Scope keys by
   creating a dedicated low-privilege user rather than pointing them at an admin account.

### Where the tool schemas come from

This pipeline explains most of the gotchas in §6, so it's worth understanding:

```
payload.config
  └─ configToJSONSchema(config)          ← Payload core; the same thing that generates payload-types.ts
       └─ .definitions[collectionSlug]   ← ONE definition is taken, in isolation
            └─ jsonSchemaToZod(...)      ← emits Zod *source code* as a string
                 └─ ts.transpileModule() ← TS → JS
                      └─ new Function('z', ...) ← eval'd to get the live schema
                           └─ server.tool(name, description, shape, handler)
```

Three consequences fall straight out of this:

- **Field-per-parameter.** The generated object's properties become the tool's parameters, so agents
  set fields directly (`title`, `slug`, `layout`) instead of passing an opaque `data` blob.
- **`$ref`s dangle.** `configToJSONSchema` emits cross-references like
  `{"$ref": "#/definitions/media"}` for relationships and uploads. Only a single definition is handed
  to the converter, so those references resolve to nothing and degrade to `z.any()`. §6.1 is entirely
  about the fallout.
- **`update` differs from `create` structurally.** The update tool wraps every field in `.optional()`
  for PATCH semantics; the create tool does not. Same field, two different validators — which is why
  a call that works on create can fail on update.

Internally each tool re-serializes its arguments to a JSON string and the handler parses it before
calling the Local API, so argument types survive only as far as JSON allows.

## 4. Installation and configuration

```bash
pnpm add @payloadcms/plugin-mcp
```

```ts
// payload.config.ts
import { mcpPlugin } from '@payloadcms/plugin-mcp'

export default buildConfig({
  // ...
  plugins: [
    mcpPlugin({
      collections: {
        articles: {
          description: 'Long-form articles. Use for editorial content.',
          enabled: { find: true, create: true, update: true, delete: false },
        },
        media: {
          enabled: { find: true },        // read-only
        },
      },
      globals: {
        site: {
          description: 'Global site settings.',
          enabled: { find: true, update: true },
        },
      },
      mcp: {
        handlerOptions: { verboseLogs: true },   // logs every tool registration + parsed args
        serverOptions: { serverInfo: { name: 'My CMS MCP', version: '1.0.0' } },
      },
    }),
  ],
})
```

`enabled` accepts `true` as shorthand for all capabilities. **Enable the narrowest set that does the
job** — `enabled: true` on a collection hands an agent deletion.

### Options reference

| Option | Purpose |
|---|---|
| `collections` / `globals` | Which entities are exposed, their capabilities, and a `description` the model uses to decide when to reach for them |
| `disabled` | Kill the server but keep the API-key collection, so the DB schema stays stable for migrations |
| `mcp.tools` / `.prompts` / `.resources` | Register custom MCP primitives with Payload-aware handlers |
| `mcp.handlerOptions.basePath` | Mount path, default `/api` |
| `mcp.handlerOptions.maxDuration` | Handler timeout in seconds, default `60` |
| `mcp.handlerOptions.verboseLogs` | Log registration and parsed arguments — the fastest way to debug a rejected call |
| `mcp.serverOptions.serverInfo` | Name/version advertised to clients |
| `userCollection` | Which collection API keys link to; defaults to `admin.user` |
| `overrideApiKeyCollection` | Extend the generated key collection (extra fields, access, hooks) |
| `overrideAuth` | Replace API-key auth entirely (OAuth, session, mTLS) |
| `experimental.tools.*` | Opt into collection/config/job/auth tooling; each needs `enabled: true` and most also require `NODE_ENV === 'development'` |

`description` is worth real effort. It is one of the few levers on *when* a model picks a tool.

### Creating an API key

1. Payload admin → **MCP → API Keys** → new document.
2. Pick the **user** whose permissions the key inherits.
3. Tick only the capabilities that key needs.
4. Save, copy the generated key once, and store it in your secret manager.

Rotating is just deleting the document. Narrowing is unticking a box.

## 5. Connecting AI agents

### Claude Code

Create `.mcp.json` in the project root:

```json
{
  "mcpServers": {
    "my-cms": {
      "type": "http",
      "url": "http://localhost:3000/api/mcp",
      "headers": { "Authorization": "Bearer ${PAYLOAD_MCP_API_KEY}" }
    }
  }
}
```

`${VAR}` is expanded from the environment, so the file is safe to commit while the key stays in
`.env`. Verify and reconnect with the `/mcp` command; tools appear as `mcp__my-cms__findArticles`
and so on.

### Claude Desktop

Desktop speaks stdio, so bridge it:

```json
{
  "mcpServers": {
    "my-cms": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://localhost:3000/api/mcp",
               "--header", "Authorization: Bearer YOUR_KEY"]
    }
  }
}
```

### Agent SDKs and other clients

Any MCP-capable client works — it's ordinary streamable HTTP. Point it at
`POST /api/mcp` with the bearer header. For the Claude Agent SDK, register the same URL and header in
the SDK's MCP server config.

### Smoke test without an agent

```bash
# expect 401 — proves the endpoint is mounted and auth is live
curl -s -o /dev/null -w '%{http_code}\n' -X POST http://localhost:3000/api/mcp

# list the tools this key is allowed to see
curl -s -X POST http://localhost:3000/api/mcp \
  -H "Authorization: Bearer $PAYLOAD_MCP_API_KEY" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

If `tools/list` comes back shorter than expected, it's the key's checkboxes — not the plugin config.

## 6. Gotchas

Everything here was reproduced during R&D.

### 6.1 Relationship and upload IDs are the big one

Root cause is the dangling `$ref` from §3. Payload emits:

```json
{ "oneOf": [ { "type": "number" }, { "$ref": "#/definitions/media" } ] }
```

With the `$ref` unresolvable, the generated validator becomes:

```js
const schemas = [z.number(), z.any()];
// oneOf ⇒ EXACTLY ONE branch may match
if (schemas.length - errors.length !== 1) { /* invalid_union */ }
```

A bare numeric ID matches **both** `z.number()` and `z.any()` — two matches — so it is rejected as
ambiguous:

```
invalid_union … "Invalid input: Should pass single schema"
```

An `invalid_union` with an **empty** `unionErrors` array is the signature of this bug: nothing
failed, too much passed.

**Nested in an array or object parameter** (a block in a `layout`, a field inside a `group`), wrap
the ID in an object so only `z.any()` matches. Payload then extracts the id:

```jsonc
// ✗ rejected as ambiguous
{ "blockType": "featuredArticle", "article": 12 }

// ✓ accepted, stored as article: 12
{ "blockType": "featuredArticle", "article": { "id": 12 } }

// ✓ hasMany
{ "articles": [ { "id": 12 }, { "id": 13 } ] }
```

**As a top-level field on an `update` tool**, neither form works. Top-level `{}`-schema parameters
arrive as raw strings — `{"id": 12}` reaches Payload as the literal text `'{"id": 12}'`, and a bare
`12` arrives as `"12"`, which Payload's update path rejects for integer-ID relations:

```
The following field is invalid: Template > Template
```

Practical rules:

| Situation | Works? | Approach |
|---|---|---|
| Nested inside an array/object param | ✅ | `{"id": N}` |
| Top-level on `create*` | ✅ | Bare `N` — Payload coerces the string on create |
| Top-level on `update*` | ❌ | Set it at create time, or in the admin UI |
| Nested upload in a `group` (e.g. a SEO `meta.image`) | ❌ | Same union rejection; set it in the admin |

The asymmetry between create and update comes from the `.optional()` wrapping plus Payload's
stricter update-path ID handling — so **set relationships and uploads when you create the document.**

### 6.2 Partial updates merge — use it deliberately

`update*` merges into the existing document. Fields you omit keep their values, which is what makes
§6.1's workaround viable: set uploads once (create or admin), then let agents update text freely
without touching them. Omitting a relationship is safe; sending it wrong is not.

### 6.3 Globals have no create tool

A global whose required fields have never been saved cannot be initialized over MCP, because every
`update` must satisfy those required fields — and if any of them is an upload, §6.1 blocks it. Save
the global once in the admin, then MCP can maintain everything else. Design globals with
MCP-writable defaults if agent-driven setup matters to you.

### 6.4 Localization needs care with blocks

Pass `locale` on any call to target one locale, and use separate calls per locale.

The trap: a `blocks` field is usually **not** localized while the text fields *inside* it are. Rows
are matched by block `id`. Send a locale update without ids and Payload treats it as a new array —
old rows are dropped and recreated, taking the other locale's text with them.

```
1. create/update in the default locale
2. read the response and keep every block id (and nested array-item ids)
3. update with locale: "es", resending the full array WITH those ids
```

Also observed: `locale: "all"` on a **global** find returned only non-localized fields. Read one
locale at a time.

### 6.5 Drafts and visibility

`create*`/`update*` accept `draft: true` and `_status: 'draft' | 'published'`. A draft-only document
is invisible to frontend queries that don't pass `draft: true` — including, in a typical codebase,
helpers that resolve related config documents. If an agent creates a draft and "nothing renders",
this is usually why, and it's a property of your data layer rather than of MCP.

To unpublish, update with `_status: 'draft'` and no `draft` flag.

### 6.6 Errors are either too terse or too long

Two very different failure modes:

- **Payload validation** returns only field *labels*: `The following field is invalid: Article >
  Image`. No path, no reason. Bisect by sending one field at a time.
- **Zod validation** enumerates *every* branch of a large union. For a blocks field with ~20 block
  types this runs past 100 KB and clients truncate the middle — frequently the branch you need. Send
  a single block per call to shrink the output, or reason from the branches that *are* visible.

`verboseLogs: true` logs the parsed arguments server-side, which settles argument-shape questions
much faster than reading client-side errors.

### 6.7 Responses are full documents

Every write echoes the complete document, rich text included, and find has no field-selection
parameter. Large documents burn agent context fast. Keep `limit` low, prefer `where` over
paginating, and expect a handful of big writes to dominate a session's tokens.

### 6.8 Transport and session pitfalls

- Switching the dev server between HTTP and HTTPS (or restarting into a different protocol) while a
  client holds a session produces `unknown certificate verification error`. Reconnect the client.
- The URL in your client config must match the server's actual protocol; there's no auto-negotiation.
- Default handler timeout is 60s. Long writes with heavy `afterChange` hooks can exceed it — raise
  `maxDuration`, and remember any proxy in front imposes its own ceiling (Cloudflare cuts the origin
  off at ~100s and returns a 524). See §7.

### 6.9 Experimental tools deserve their label

- Collection/config/job tools **write TypeScript files into your source tree** and are gated on
  `NODE_ENV === 'development'`.
- The auth family exposes login, verify, unlock, reset-password and forgot-password. Note that
  `resetPassword`, `forgotPassword` and `unlock` are **not** gated by the development check the other
  experimental tools have — enabling that family in production exposes them. Leave it off.

### 6.10 `overrideAuth`'s key argument doesn't work

The default settings helper computes:

```js
const apiKey = overrideApiKey ?? req.headers.get('Authorization')?.startsWith('Bearer ')
  ? req.headers.get('Authorization')?.replace('Bearer ', '').trim()
  : null
```

`??` binds tighter than `?:`, so the condition is `(overrideApiKey ?? startsWith(...))` and the true
branch always re-reads the header. Passing a key into
`getDefaultMcpAccessSettings(myKey)` is silently ignored. If you implement `overrideAuth`, resolve
the access settings document yourself instead of relying on that argument.

### 6.11 Generated validators are `eval`'d

Zod source is built as a string, transpiled, and run through `new Function`. The input is your own
Payload config, so this is a first-party trust boundary rather than a user-input one — but it means a
config change can produce a *runtime* schema error, and that config is now security-relevant.

### 6.12 Deletion is off unless you ask for it

`delete` defaults off per collection and there is no delete tool for globals. Keep it off for
agent-facing keys: without it, mistakes are always recoverable by editing. An agent that cannot
delete can still overwrite, so versions/drafts remain your real safety net.

## 7. Hosting on Cloudflare

### The plugin requires a Node runtime

**It cannot run on the Cloudflare Workers runtime** (Workers, or Pages Functions — including Next
deployed via `@opennextjs/cloudflare`). Two independent blockers, both from the §3 schema pipeline:

1. Schemas are produced by `new Function('z', ...)`. `workerd` disallows runtime code generation, so
   this throws `Code generation from strings disallowed`. It runs on **every** request, once per
   exposed collection and global, so the endpoint 500s rather than degrading.
2. The pipeline imports the **TypeScript compiler** to transpile the generated source. Bundling
   `typescript` into a Worker is multi-megabyte and will likely exceed the Worker size limit on its
   own.

Neither has a configuration workaround; both would need an upstream change (precompiled schemas
instead of eval). Note also that `@vercel/mcp-adapter` is only the transport library — it carries no
dependency on Vercel and runs anywhere Node runs.

So: run Payload — and therefore the MCP endpoint — on a **Node runtime** (a container on a VM, ECS,
Fly, Railway, or similar), and keep Cloudflare in front for DNS, CDN, and WAF.

### Typical split-stack topology

```
                        ┌──────────────────────────────┐
   visitors  ──────────▶│  Cloudflare Workers          │  front-end (OpenNext)
                        │  + Worker API gateway/cache  │  read-only, edge-cached
                        └───────────────┬──────────────┘
                                        │  GraphQL / REST (reads)
                                        ▼
   AI agent  ──────────────────▶  CMS origin  (Node container)
   POST /api/mcp                  Payload + plugin-mcp + Postgres + S3/R2
   (direct — bypasses the edge)
```

The front-end running on Workers is irrelevant to MCP: it never hosts `/api/mcp`, so the runtime
restrictions above don't touch it.

**Agents must target the CMS origin**, not the public site domain and not an API-gateway Worker. A
gateway that matches a fixed allowlist of content routes will never forward `/api/mcp` — it will 401
or 404 instead, which reads as "MCP is broken" when it is simply the wrong hostname.

### Edge checklist when the CMS hostname is proxied

| Concern | Symptom | Fix |
|---|---|---|
| Bot Fight Mode / Super Bot Fight / managed WAF / Browser Integrity Check | HTML challenge or 403 instead of JSON-RPC; the client reports a transport or parse error, never "blocked" | WAF **skip rule** on `/api/mcp` — skip bot protection and managed rules |
| Cloudflare Access (Zero Trust) | Agent receives the Access login page or a redirect | Create a **service token**; add `CF-Access-Client-Id` and `CF-Access-Client-Secret` beside `Authorization` in the client config |
| 524 origin timeout (~100s) | Long write dies mid-flight | Keep `afterChange` hooks fast; keep `maxDuration` under the proxy ceiling |
| Rate limiting / DDoS rules | Sporadic 429 during a burst of agent writes | Exempt the path, or allowlist the agent's IPs |
| Request body limit (100 MB on free) | Large upload rejected at the edge | Only affects media; text payloads are kilobytes |
| Caching | None — `POST` is never cached by Cloudflare | Avoid broad "Cache Everything" rules over `/api/*`, which can disturb other Payload endpoints |

One command settles most of it:

```bash
curl -i -X POST https://<cms-host>/api/mcp
```

A `401` with a JSON body means the path is clear. An HTML challenge page or an Access redirect means
you need the skip rule or the service token.

### Remote agents cannot upload files

The create tool's `filePath` parameter resolves on the **server's** filesystem. An agent on a laptop
and a CMS in a container share no path, so agent-driven uploads only work when both sides are the
same machine (local development). With an S3/R2 storage adapter in production, treat media as a
human/admin task and have agents reference existing media IDs.

### Cache visibility of agent writes

Edge caches — Worker Cache API entries, the CDN cache — routinely hold content for long TTLs. Because
MCP writes go through the Local API, any `afterChange` purge hooks fire exactly as they do for admin
edits, so this generally just works. But if a purge is missing for some path, agent-authored content
stays stale for the whole TTL and looks like an MCP failure. Confirm the purge end-to-end once with a
real MCP write. Documents left as drafts stay invisible by design (§6.5).

### Environments and keys

Issue **one API key per environment per agent**. Enable MCP on staging before production, and never
point a key at an admin-privileged user (§3).

## 8. Hosting on Vercel

This is how **this** repo is deployed. Unlike Cloudflare Workers (§7), Vercel runs Next.js route
handlers on a Node runtime, so both of the §7 blockers disappear: `new Function` is permitted and the
TypeScript compiler can be bundled. The MCP endpoint works on Vercel with no code changes to the
plugin — but several things around it do need configuring.

### The transport is already serverless-shaped

`mcp-handler` builds a **fresh `McpServer` and transport per POST** and defaults `sessionIdGenerator`
to undefined, i.e. stateless. Nothing is held between requests, so a new lambda instance per call is
fine and **no Redis is needed**. `mcp-handler` does depend on `redis`, and its `REDIS_URL` is only
consulted on the legacy SSE path — which this plugin never registers (§3). Ignore it.

### `typescript` must be a runtime dependency

`convertCollectionSchemaToZod` does `import * as ts from 'typescript'` on every request, but
`@payloadcms/plugin-mcp` does **not** declare `typescript` in its own dependencies — it borrows the
host project's copy. If it sits in `devDependencies`, any install that skips dev dependencies
produces a lambda that throws `Cannot find module 'typescript'` on the first MCP call while the rest
of the site works perfectly.

It is in `dependencies` in this repo for that reason. Verified in the build output: the
`/api/[...slug]` function traces 25 `typescript/lib` files, and the whole function is ~64 MB against
Vercel's 250 MB uncompressed limit (`sharp` is the larger half at ~35 MB).

### Media must move off the filesystem

Vercel's filesystem is read-only apart from `/tmp`, and `/tmp` does not survive the invocation, so
`upload: true` on its own cannot persist anything. `@payloadcms/storage-vercel-blob` replaces the disk:

```ts
vercelBlobStorage({
  collections: { media: true },
  token: serverEnv.BLOB_READ_WRITE_TOKEN,   // undefined ⇒ adapter disables itself
  alwaysInsertFields: true,
  clientUploads: true,
})
```

Three things worth knowing:

- **The Blob store must be created with _public_ access.** The adapter's `access` option accepts the
  single value `'public'`, it defaults to that, the client upload handler hardcodes it, and the
  public URL is built as `https://<store>.public.blob.vercel-storage.com`. Point it at a **private**
  store and uploads fail with `Vercel Blob: Cannot use public access on a private store`. Still true
  in the latest 3.86.0, so upgrading is not a workaround — the store has to be public.

  This fails in a misleading way: `/api/vercel-blob-client-upload-route` returns **200** because
  `handleUpload` only mints a client token and never checks the store's access mode. The rejection
  lands on the browser's subsequent PUT to the Blob host, which `@vercel/blob` then retries ~4×. In
  the network tab you see one healthy token request followed by four zero-byte failures on the
  filename, and nothing in your server logs. Reproduce it away from the browser with a server-side
  `put()` using the same token — the error message is explicit there.
- **The token doubles as the on/off switch.** With `BLOB_READ_WRITE_TOKEN` unset the adapter returns
  the config untouched and uploads go to `./media`, which is what you want locally. A malformed token
  (not `vercel_blob_rw_<store>_<random>`) throws at config build time instead of degrading.
- **`clientUploads: true` matters.** Without it the file is POSTed through a serverless function,
  which caps request bodies at 4.5 MB. With it the browser uploads straight to Blob and the ceiling
  is Blob's, not the function's.
- **`next/image` needs the Blob host allowlisted.** Deployed media is served from
  `https://<store>.public.blob.vercel-storage.com`, so `images.remotePatterns` in `next.config.mjs`
  must include it. Locally URLs stay relative and no entry is needed — which is exactly why this
  breaks only after deploying.

`alwaysInsertFields` is documented to keep the adapter's `prefix` field in the schema even when the
adapter is off, so that migrations generated locally match production. **In 3.71.1 it does not do
that**: the Vercel Blob wrapper returns early on a missing token, before `cloudStoragePlugin` is ever
called with the option. Left alone, the column exists on Vercel but not on a dev machine, and the
next `payload migrate:create` run locally emits `DROP COLUMN prefix` against production. `Media`
therefore declares `prefix` itself; `getFields` detects the existing field and merges into it rather
than duplicating it. Confirmed token-independent by diffing `payload generate:db-schema` with and
without a dummy token — byte-identical.

Agent-driven uploads still do not work remotely, for the §7 reason: `filePath` resolves on the
server's filesystem. Treat media as a human task and have agents reference existing media IDs.

### Migrations are mandatory

`@payloadcms/db-postgres` only runs `push` when `NODE_ENV !== 'production'`
(`db-postgres/dist/connect.js`). On Vercel that check fails, nothing is pushed, and an empty
`src/migrations/` means the deploy comes up against a schema-less database. Payload's own
`payload_mcp_api_keys` table is part of this — without it, every MCP call 401s because the key lookup
hits a missing table.

So the build command is `pnpm run ci` (`payload migrate && next build`), wired in `vercel.json`.
Migrations run against the production database during the build, before the app is promoted.

**`push` is off in every environment** (`push: false` in `payload.config.ts`), dev included. Left on,
a config change lands on the dev database the moment `pnpm dev` reloads, nothing records what
changed, and the gap between that database and `src/migrations/` only shows up as a broken deploy.
Off, dev and production apply the same files in the same order, and a migration is exercised locally
before it ever runs against production. The cost is one explicit step per schema change.

#### The loop after any schema change

Anything that changes the shape of the config — a new field, collection, global, or an option that
adds a column such as `versions`/`drafts` or a new `localization` locale — needs a migration:

```bash
pnpm migrate:create <name>    # writes src/migrations/<timestamp>_<name>.{ts,json}
pnpm migrate                  # applies pending migrations to DATABASE_URL
pnpm generate:types           # refresh src/payload-types.ts
pnpm migrate:status           # confirm
```

`migrate:create` diffs the config against the `.json` snapshot beside the previous migration, **not**
against a live database, so it works exactly the same with push disabled. Commit the `.ts`, the
`.json`, and the regenerated `src/migrations/index.ts` together — the snapshot is what the next
migration diffs against, and dropping it makes the following `migrate:create` re-emit the whole
schema.

Until you run `pnpm migrate`, the dev database has the old schema while the config has the new one.
Payload will error on the missing columns rather than silently adapting — that is the intended
signal, not a bug.

#### Resetting a dev database that push already built

A database built by `push` has all the tables and a `dev` row with batch `-1` in `payload_migrations`,
so `pnpm migrate` there conflicts on the initial migration. Drop and rebuild it from the migration
files instead — **this destroys all local data**:

```bash
pnpm migrate:fresh --force-accept-warning
```

Do this once when switching a machine off push. Afterwards `migrate:status` shows every migration in
batch order and the plain `pnpm migrate` loop works. Never point `migrate:fresh` at anything but a
local database.

### Environment variables

`src/env/server.ts` validates with `@t3-oss/env-nextjs` at **build** time, so a missing variable
fails the Vercel build rather than the first request. Set all of these in the project settings:

| Variable | Notes |
|---|---|
| `DATABASE_URL` | Use the **pooled** connection string. Each lambda instance opens its own `pg` pool, so an unpooled endpoint exhausts connections under concurrency — put PgBouncer/Neon's pooler in front. |
| `PAYLOAD_SECRET` | Must be stable. Rotating it invalidates every MCP API key, since keys are matched by `HMAC-SHA256(secret, key)` (§3). |
| `NEXT_PUBLIC_SITE_URL` | The deployed origin. Feeds `generateURL` for SEO and previews. |
| `PREVIEW_SECRET` | Draft preview. |
| `BLOB_READ_WRITE_TOKEN` | Added automatically when you link a Blob store; do not set it by hand. |

`PAYLOAD_MCP_API_KEY` and `PAYLOAD_MCP_URL` are **not** app variables — they are read by the MCP
client on your machine to resolve `.mcp.json`. They do not belong in Vercel.

### Timeouts

The plugin's handler budget defaults to 60 s (`mcp.handlerOptions.maxDuration`), and the function
ceiling is declared as `export const maxDuration = 60` in the catch-all route. Keep the two in step —
a function ceiling below the handler budget truncates long writes — and raise both together if
`afterChange` hooks are heavy. Note your plan caps this regardless of what you ask for.

It is declared in the route rather than through `vercel.json`'s `functions` key because those globs
would have to match `src/app/(payload)/api/[...slug]/route.ts`, and the route group's parentheses
collide with glob syntax. The route-segment export has no such ambiguity.

### Pointing an agent at the deployment

`.mcp.json` resolves its URL from the environment, defaulting to localhost:

```bash
export PAYLOAD_MCP_URL=https://<your-app>.vercel.app/api/mcp
export PAYLOAD_MCP_API_KEY=<key created in that environment's admin>
```

Keys live in the database, so a production key must be created in the **production** admin — a local
key will not authenticate against it. Reconnect with `/mcp` after changing either variable.

Smoke test the deployment before wiring an agent to it:

```bash
# 401 with a JSON body ⇒ endpoint mounted, auth live
curl -s -o /dev/null -w '%{http_code}\n' -X POST https://<your-app>.vercel.app/api/mcp
```

A 404 instead means the request never reached Payload's catch-all. Note that `src/proxy.ts`
(Next 16's renamed middleware) excludes `/api` in its matcher — widening that matcher to cover
`/api` would let the next-intl middleware redirect MCP traffic and break the endpoint.

## 9. Practical recommendations

1. **One key per agent per environment**, each tied to a purpose-built user. Never reuse an admin
   account's key.
2. **Start read-only.** Enable `find`, confirm the agent navigates your content model, then add
   `create`/`update`.
3. **Leave `delete` off.**
4. **Set relationships and uploads at create time**; let updates carry text.
5. **Write real `description` strings** for every exposed entity — it's the main influence on tool
   selection.
6. **Turn on `verboseLogs` while developing** and watch the server console during agent runs.
7. **Enable drafts** on agent-writable collections so nothing an agent does goes live unreviewed.
8. **Verify writes out-of-band** for anything important — query the DB or the REST API rather than
   trusting the echoed response, particularly for localized and nested data.
9. **Never enable the experimental families in production.**
10. **Keep the MCP endpoint on a Node origin** and, if it is publicly reachable, put a WAF skip rule
    plus Cloudflare Access service tokens in front of it rather than relying on the bearer key alone
    (§7).

## 10. Quick reference

| Item | Value |
|---|---|
| Package | `@payloadcms/plugin-mcp` (version-match your `payload` version exactly) |
| Endpoint | `POST /api/mcp` (GET returns "Method not allowed" by design) |
| Transport | Streamable HTTP (JSON-RPC), via `@vercel/mcp-adapter` (library only — no Vercel dependency) |
| Runtime | **Node required.** Works on Vercel serverless (§8). Cloudflare Workers / Pages Functions cannot run it — see §7 |
| Runtime dep | `typescript` must be in `dependencies`, not `devDependencies` — the plugin imports it per request but does not declare it (§8) |
| Behind Cloudflare | Works when proxying a Node origin; needs a WAF skip rule on `/api/mcp`, and Access service tokens if Zero Trust is enabled |
| Auth | `Authorization: Bearer <api-key>`, matched by HMAC-SHA256 against `payload-mcp-api-keys` |
| Identity | The user linked to the key; ops run `overrideAccess: false` |
| Collection tools | `find<X>`, `create<X>`, `update<X>`, `delete<X>` |
| Global tools | `find<X>`, `update<X>` |
| Schema source | `configToJSONSchema` → `jsonSchemaToZod` → transpile → `new Function` |
| Find defaults | `limit` 10, max 100; `page` 1 |
| Handler timeout | 60s (`maxDuration`) |
| Nested relationship syntax | `{"id": N}` — never a bare ID |
