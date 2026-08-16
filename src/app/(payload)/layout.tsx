/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import { connection } from 'next/server'
import type { ServerFunctionClient } from 'payload'
import React, { Suspense } from 'react'

import { importMap } from './admin/importMap.js'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

/**
 * MODIFIED, despite the banner above. Re-run Payload's scaffold and this is lost;
 * the symptom is the admin logging "encountered the unstable value `new Date()`
 * while prerendering" on every request.
 *
 * Payload's RootLayout resolves the session while it renders, and Payload's cookie
 * code reads the wall clock to work out expiry (`payload/dist/auth/cookies.js`).
 * With `cacheComponents: true` a prerender must be reproducible, so any clock read
 * during it is an error. Marking the admin as request-time is the honest fix rather
 * than a workaround: every byte of it depends on who is asking, and none of it was
 * ever safe to prerender.
 *
 * `connection()` lives here, *under* the Suspense boundary, not in `Layout` itself.
 * This file is the root layout for the (payload) group — there is no parent that
 * could hold a boundary — and under Cache Components a dynamic API with no Suspense
 * above it fails the build rather than falling back. Keeping the boundary on top
 * also lets the shell flush immediately while the admin streams in behind it.
 */
const AdminShell = async ({ children }: Args) => {
  await connection()

  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}

const Layout = ({ children }: Args) => (
  <Suspense>
    <AdminShell>{children}</AdminShell>
  </Suspense>
)

export default Layout
