import { AlertCircle } from 'lucide-react'

const ErrorBanner = ({ message, subMessage = '', compact = false, show = true }) => {
  const badgeSize = compact ? 'h-8 w-8' : 'h-10 w-10'
  const iconSize = compact ? 'h-5 w-5' : 'h-6 w-6'

  return (
    <div
      className={`flex items-center ${compact ? 'mt-3 gap-1.5' : 'mt-3 gap-2 '}`}
    >
     {
      show&&(
         <div
        className={`flex ${badgeSize} shrink-0 items-center justify-center ${
          compact ? 'rounded-md' : 'rounded-lg'
        } border border-[#FFC9C9] bg-[#ffc9c9]`}
      >
        <AlertCircle className={`${iconSize} text-[#EF4444]`} strokeWidth={1.8} />
      </div>
      )
     }
      <div>
        <p className="text-xs font-bold leading-5.5 tracking-normal text-[#EF4444]">{message}</p>
        {subMessage && (
          <p className="mt-0.5 text-[10px] font-medium tracking-normal text-[#4A3C3C]">{subMessage}</p>
        )}
      </div>
    </div>
  )
}

export default ErrorBanner
