import { LayoutGrid, MessageSquare, BookOpen, CheckSquare, GitBranch, FileText, Calendar, Sparkles } from 'lucide-react'

const RAIL_ICONS = [LayoutGrid, MessageSquare, BookOpen, CheckSquare, GitBranch, FileText, Calendar]

const IconRail = () => (
  <div className="flex shrink-0 flex-col items-center gap-3">
    <nav className="flex flex-col items-center gap-2 rounded-3xl border border-gray-200 bg-white p-2 shadow-sm">
      {RAIL_ICONS.map((Icon, index) => (
        <button
          key={index}
          type="button"
          className="grid h-9 w-9 place-items-center rounded-xl border border-[#F1F1F1] text-black transition-colors hover:bg-gray-100 hover:text-gray-800"
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </nav>

    <button
      type="button"
      aria-label="Assistant"
      className="grid h-11 w-11 place-items-center rounded-full bg-black text-white shadow-sm transition-colors hover:bg-gray-800"
    >
      <Sparkles className="h-5 w-5" />
    </button>
  </div>
)

export default IconRail
