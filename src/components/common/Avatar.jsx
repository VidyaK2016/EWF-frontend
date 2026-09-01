const PALETTE = ['bg-slate-700', 'bg-emerald-700', 'bg-indigo-700', 'bg-rose-700', 'bg-amber-700', 'bg-teal-700']

const colorFor = (name) => {
  const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return PALETTE[hash % PALETTE.length]
}

const initialsFor = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

const Avatar = ({ name, className = '' }) => (
  <div
    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-semibold text-white ${colorFor(name)} ${className}`}
  >
    {initialsFor(name)}
  </div>
)

export default Avatar
