const DISTRIBUTION = [
  { label: 'Employee', value: 290, pct: 62 },
  { label: 'Manager', value: 28, pct: 58 },
  { label: 'HR user', value: 28, pct: 28 },
  { label: 'Finance user', value: 28, pct: 44 },
]

const UserDistributionCard = () => (
  <div className="rounded-2xl border border-[#EDEDED] bg-white p-5 shadow-sm sm:p-6">
    <div className="flex items-center justify-between">
      <h2 className="font-inter text-[15px] font-bold text-gray-900">User Distribution</h2>
      <button type="button" className="text-[13px] font-semibold text-[#FC5F08] hover:underline">
        View all
      </button>
    </div>

    <ul className="mt-6 space-y-5">
      {DISTRIBUTION.map((row) => (
        <li key={row.label}>
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-gray-900">{row.label}</span>
            <span className="text-[14px] font-semibold text-gray-900">{row.value}</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#ECECEC]">
            <div className="h-full rounded-full bg-[#F26A5B]" style={{ width: `${row.pct}%` }} />
          </div>
        </li>
      ))}
    </ul>
  </div>
)

export default UserDistributionCard
