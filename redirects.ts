import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // Studio has no public frontend: the root goes to the admin, which itself
  // sends unauthenticated visitors on to /admin/login.
  const rootToAdmin = {
    destination: '/admin',
    permanent: false,
    source: '/',
  }

  return [internetExplorerRedirect, rootToAdmin]
}
