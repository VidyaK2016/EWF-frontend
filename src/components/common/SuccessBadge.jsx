/**
 * Tick-in-a-circle badge used by success screens.
 * Colour comes from the parent via `text-*`, so it can be reused for any state.
 */
const SuccessBadge = ({ className = '' }) => (
  <svg viewBox="0 0 52 52" fill="none" aria-hidden="true" focusable="false" className={className}>
    <circle cx="26" cy="26" r="26" fill="currentColor" opacity="0.12" />
    <mask id="success-badge-tick">
      <rect width="52" height="52" fill="#fff" />
      <path
        d="M17.5 26.5 23 32 34 21"
        stroke="#000"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </mask>
    <circle cx="26" cy="26" r="19" fill="currentColor" mask="url(#success-badge-tick)" />
  </svg>
)

export default SuccessBadge
