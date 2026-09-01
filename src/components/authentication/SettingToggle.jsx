import { useState } from 'react'

// Label + switch row used in the "Global Authentication Settings" panel.
// Self-contained state — this is a mock surface with no backend yet.
const SettingToggle = ({ label, defaultOn = false }) => {
  const [on, setOn] = useState(defaultOn)

  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-inter text-[12px] font-medium leading-[17.5px] tracking-[0px] text-black">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => setOn((v) => !v)}
        className={`relative inline-flex h-[17.5px] w-[35px] shrink-0 items-center rounded-full transition-colors ${
          on ? 'bg-emerald-500' : 'bg-[#2A3347]'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
            on ? 'translate-x-[19.25px]' : 'translate-x-[1.75px]'
          }`}
        />
      </button>
    </div>
  )
}

export default SettingToggle
