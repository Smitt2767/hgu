/**
 * Posting a small payload from the browser without holding anything up.
 *
 * `sendBeacon` is the right primitive for both callers here, and for the same reason in
 * each: the page may be gone before the request finishes. An exposure fires on a page a
 * visitor might leave immediately, and a conversion fires on a click that is *about* to
 * navigate away — a plain `fetch` there is cancelled when the document unloads, which
 * would lose exactly the clicks the experiment exists to count.
 *
 * Returns nothing. Nobody reads the response; the routes answer 204 and log their own
 * failures, because a visitor's page has no business surfacing an analytics problem.
 */
export function beacon(url: string, body: unknown): void {
  const payload = JSON.stringify(body)

  // `false` means the browser refused to queue it — over the size cap, or the API is
  // disabled — rather than that delivery failed.
  const queued = navigator.sendBeacon?.(url, new Blob([payload], { type: 'application/json' }))

  if (queued) return

  // `keepalive` asks for the same survive-the-unload behaviour, which is the only part
  // of `sendBeacon` worth reproducing here.
  void fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {})
}
