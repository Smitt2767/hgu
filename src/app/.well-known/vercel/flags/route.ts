import { createFlagsDiscoveryEndpoint, getProviderData } from 'flags/next'

/**
 * Exposes the flag definitions to the Vercel Toolbar's Flags Explorer.
 *
 * Empty until the first flag is declared. Add each one here by name as it lands:
 * flags must be listed explicitly rather than swept up with `import * as flags`,
 * because a namespace import also collects helper exports that are not flags,
 * which breaks the ProviderData type.
 *
 * Answers 401 without a valid access proof — and note the raw FLAGS_SECRET is
 * *also* a 401. `verifyAccess` wants an encrypted proof token minted by the
 * Toolbar, not the secret's value, so testing this with a curl and the secret in
 * a header will look broken when it is working.
 */
export const GET = createFlagsDiscoveryEndpoint(async () => getProviderData({}))
