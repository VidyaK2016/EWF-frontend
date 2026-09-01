const AppDivider = ({ label = '', className = '' }) => {
  if (!label) {
    return <hr className={`border-t border-[#ADADAD] ${className}`} />
  }

  return (
    <div className={`flex w-full items-center gap-4 ${className}`}>
      <span className="h-px flex-1 bg-[#ADADAD]" aria-hidden="true" />
      <span className="whitespace-nowrap text-xs font-medium leading-[22px] tracking-normal text-[#606060]">
        {label}
      </span>
      <span className="h-px flex-1 bg-[#ADADAD]" aria-hidden="true" />
    </div>
  )
}

export default AppDivider
