const CHECK_ICON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 8.5l3.2 3.2L13 5'/%3E%3C/svg%3E\")"

const AppCheckbox = ({ id, label, checked = false, onChange, className = '', ...inputProps }) => {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer select-none items-center gap-2 text-xs font-medium tracking-normal text-black ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-[22px] w-[22px] shrink-0 cursor-pointer appearance-none rounded-md border border-[#F36A0E] bg-[#FFECE0] bg-[length:100%_100%] bg-no-repeat outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        style={{
          backgroundColor: checked ? '#F36A0E' : '#FFECE0',
          backgroundImage: checked ? CHECK_ICON : 'none',
        }}
        {...inputProps}
      />
      {label}
    </label>
  )
}

export default AppCheckbox
