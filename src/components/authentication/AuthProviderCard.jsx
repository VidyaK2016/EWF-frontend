import { Check, X } from 'lucide-react'

const SyncFlag = ({ ok, label }) => (
  <span className={`flex items-center gap-1 ${ok ? 'text-emerald-400' : 'text-gray-500'}`}>
    {ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
    {label}
  </span>
)

// One integration row in the Authentication page. `tone="black"` is the fully
// active/primary provider; every other card uses the dark slate treatment.
const AuthProviderCard = ({
  name,
  icon: Icon,
  iconColor = 'text-white',
  tone = 'slate',
  status = 'not-started',
  detail,
  userSync = false,
  groupSync = false,
  domain,
}) => {
  const isActive = status === 'active'

  return (
    <div
      className={`rounded-[10.5px] border border-[#2A3347] p-[17.5px] ${
        tone === 'black' ? 'bg-black' : 'bg-[#141b27]'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5">
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </span>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-inter text-[12.25px] font-semibold leading-[17.5px] tracking-[0px] text-[#E8EDF5]">
                {name}
              </span>
              {isActive ? (
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-[5.25px] rounded-full bg-black px-[7px] py-[1.75px] font-inter text-[10.5px] font-medium leading-[14px] tracking-[0px] text-[#8B96A8]">
                  Not Started
                </span>
              )}
              {isActive && (
                <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Connected
                </span>
              )}
            </div>

            <p
              className={`mt-1 text-[10.5px] font-normal leading-[14px] tracking-[0px] text-[#5A6578] ${
                isActive ? 'font-mono' : 'font-inter'
              }`}
            >
              {detail || 'Not configured'}
            </p>

            {isActive && (
              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px]">
                <SyncFlag ok={userSync} label="User sync" />
                <SyncFlag ok={groupSync} label="Group sync" />
                {domain && <span className="text-gray-500">Domain: {domain}</span>}
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {isActive ? (
            <>
              <button type="button" className="text-[13px] text-gray-400 hover:text-white">
                Configure
              </button>
              <button
                type="button"
                className="rounded-full bg-[#4a1d1d] px-3 py-1 text-[12px] font-medium text-red-300 hover:bg-[#5a2323]"
              >
                Disable
              </button>
            </>
          ) : (
            <button
              type="button"
              className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1.5 text-[12px] font-medium text-white hover:opacity-90"
            >
              Enable
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthProviderCard
