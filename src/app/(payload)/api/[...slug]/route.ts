/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'

// Added by hand. `/api/mcp` is served through this catch-all, and the MCP plugin's
// own handler budget is 60s (mcp.handlerOptions.maxDuration) — keep the function
// ceiling at least that high or long writes are cut off mid-flight. Declared here
// rather than via vercel.json `functions`, whose globs treat the `(payload)` route
// group's parentheses as glob syntax.
export const maxDuration = 60

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const PUT = REST_PUT(config)
export const OPTIONS = REST_OPTIONS(config)
