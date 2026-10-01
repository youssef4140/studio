/**
 * Preference key holding `{ open: { [tenantSlug]: boolean } }` per user.
 * In its own file because both the server and the client component need the
 * actual string, and a value exported from a 'use client' module reaches the
 * server only as a reference.
 */
export const TENANT_NAV_PREFERENCE = 'tenant-nav'
