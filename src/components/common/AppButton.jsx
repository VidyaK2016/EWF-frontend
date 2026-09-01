const VARIANT_CLASSES = {
  primary:
    'w-full rounded-xl bg-[#F36A0E] py-3.5 short:py-2.5 text-base font-bold leading-5.5 tracking-normal text-center text-white shadow-md hover:bg-[#CE5A0C] disabled:opacity-50 disabled:cursor-not-allowed',
  secondary:
    'w-full rounded-xl border border-[#FFAA70] bg-[#FFECE0] py-3.5 short:py-2.5 text-base font-bold leading-[22px] tracking-normal text-center text-[#F36A0E] hover:bg-[#FFE2D0] disabled:opacity-50 disabled:cursor-not-allowed',
  link: 'text-sm font-semibold text-orange-500 hover:text-orange-600',
  linkBlock:
    'w-full text-center text-sm font-bold leading-[22px] tracking-normal text-[#F36A0E] hover:text-[#CE5A0C]',
  icon: 'grid place-items-center rounded-xl bg-white p-3 short:p-2.5 shadow-sm hover:-translate-y-0.5 hover:shadow-md',
}

const AppButton = ({ variant = 'primary', className = '', children, ...buttonProps }) => {
  return (
    <button className={`transition-colors ${VARIANT_CLASSES[variant]} ${className}`} {...buttonProps}>
      {children}
    </button>
  )
}

export default AppButton
