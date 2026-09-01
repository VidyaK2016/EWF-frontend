const AppInput = ({
  id,
  label,
  required = false,
  error = "",
  hideErrorMessage = false,
  icon = null,
  rightElement = null,
  pill = false,
  dense = false,
  isPassword = false,
  className = "",
  ...inputProps
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-bold leading-5.5 tracking-normal text-black"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={`mt-2 short:mt-1.5 flex items-center gap-3 bg-white border px-4 shadow-sm focus-within:ring-2 focus-within:ring-orange-400 ${
          dense ? "py-2.5" : "py-3.5 short:py-2.5"
        } ${pill ? "rounded-full" : "rounded-xl"} ${error ? "border-red-400" : "border-[#FEBF96]"}`}
      >
        {icon && (
          <>
            <span className="shrink-0 text-orange-500">{icon}</span>
            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
          </>
        )}
        <input
          id={id}
          className={`w-full min-w-0 bg-transparent placeholder-[#928C86] outline-none [&:-webkit-autofill]:[-webkit-text-fill-color:theme(colors.gray.800)] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[caret-color:theme(colors.gray.800)] ${
            isPassword
              ? "text-sm font-medium leading-5.5 tracking-[6.72px] text-black placeholder:tracking-normal"
              : "text-xs font-medium leading-5.5 tracking-normal text-gray-800"
          }`}
          {...inputProps}
        />
        {rightElement}
      </div>

      {error && !hideErrorMessage && (
        <p className="mt-1.5 text-sm font-semibold text-red-500">{error}</p>
      )}
    </div>
  );
}

export default AppInput;
