// A single metric tile used in the dashboard overview grid.
// `highlight` renders the filled coral treatment (the "Total users" card).
const StatCard = ({ label, value, footer, highlight = false }) => (
  <div
    className={`flex flex-col rounded-2xl p-4 sm:p-5 ${
      highlight
        ? 'bg-gradient-to-br from-[#FB9E7C] to-[#F16A2B] text-white'
        : 'border border-[#EDEDED] bg-white text-black'
    }`}
  >
    <span className={`text-[13px] ${highlight ? 'text-white/95' : 'text-gray-500'}`}>{label}</span>
    <span className="mt-3 text-[28px] font-bold leading-none tracking-tight sm:text-[30px]">
      {value}
    </span>
    {footer != null && (
      <div
        className={`mt-auto pt-5 font-inter text-[10px] font-medium leading-none tracking-[0px] ${
          highlight ? 'text-white/90' : 'text-[#3E3E3E]'
        }`}
      >
        {footer}
      </div>
    )}
  </div>
)

export default StatCard
