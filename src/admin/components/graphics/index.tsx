import React from 'react'

// Same glyph as public/favicon.svg. Colours come from the admin theme tokens so
// the mark inverts with light/dark mode.
const SMark: React.FC<{ size: number }> = ({ size }) => (
  <svg
    aria-label="Studio"
    height={size}
    role="img"
    viewBox="0 0 32 32"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill="var(--theme-elevation-1000)" height="32" rx="7" width="32" />
    <path
      d="M21.5 11.2C21.5 8.7 19.1 7 16 7s-5.5 1.7-5.5 4.3c0 2.7 2.5 3.7 5.5 4.7s5.5 2 5.5 4.7C21.5 23.3 19.1 25 16 25s-5.5-1.7-5.5-4.2"
      fill="none"
      stroke="var(--theme-elevation-0)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
    />
  </svg>
)

/** Login / create-first-user screens. */
export const Logo: React.FC = () => <SMark size={96} />

/** Top of the nav sidebar. */
export const Icon: React.FC = () => <SMark size={26} />
