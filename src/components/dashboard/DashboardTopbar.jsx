import { Menu, Search, Bell, Settings, ChevronDown } from 'lucide-react'
import Avatar from '../common/Avatar'
import logo from '../../assets/Container.png'

const DashboardTopbar = ({ user, onMenuClick }) => (
  <header className="flex h-16 shrink-0 items-center gap-3 border-b border-gray-200 bg-white px-4 sm:px-6">
    <button
      type="button"
      aria-label="Open navigation"
      onClick={onMenuClick}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
    >
      <Menu className="h-5 w-5" />
    </button>

    {/* Logo — pinned left */}
    <div className="flex shrink-0 items-center gap-2">
      <img src={logo} alt="" className="h-8 w-8 shrink-0 rounded-lg object-cover" />
      <span className="hidden whitespace-nowrap font-inter text-[13px] font-bold leading-5 text-gray-900 sm:inline">
        Enterprise collaboration workflow
      </span>
    </div>

    {/* Search — right side, just before the notification pill */}
    <div className="ml-auto hidden w-64 shrink-0 md:block md:w-80 lg:w-[380px]">
      <div className="flex h-10 items-center gap-2.5 rounded-full border border-gray-200 bg-gray-50 px-4 focus-within:border-gray-300 focus-within:bg-white">
        <Search className="h-4 w-4 shrink-0 text-black" />
        <input
          type="text"
          placeholder="Search tasks, projects, or meetings"
          className="w-full bg-transparent text-[13px] text-black placeholder:text-gray-700 focus:outline-none"
        />
      </div>
    </div>

    {/* Actions cluster */}
    <div className="ml-auto flex shrink-0 items-center gap-3 md:ml-1">
      <button
        type="button"
        aria-label="Search"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-black hover:bg-gray-100 md:hidden"
      >
        <Search className="h-5 w-5 text-black" />
      </button>

      {/* Notification pill */}
      <div className="flex h-10 items-center gap-2 rounded-full border border-gray-200 pl-1.5 pr-2">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gray-200 text-black">
          <Bell className="h-4 w-4" />
        </span>
        <span className="hidden whitespace-nowrap text-xs font-medium text-gray-900 sm:inline">
          {user.date}
        </span>
        {user.notifications > 0 && (
          <span className="grid h-[18px] min-w-[18px] shrink-0 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {user.notifications}
          </span>
        )}
      </div>

      {/* Settings */}
      <button
        type="button"
        aria-label="Settings"
        className="hidden h-10 w-10 place-items-center rounded-full border border-gray-200 text-black hover:bg-gray-50 md:grid"
      >
        <Settings className="h-4 w-4" />
      </button>

      {/* Profile */}
      <button type="button" className="flex items-center gap-2">
        <Avatar name={user.name} className="h-10 w-10" />
        <span className="hidden max-w-[104px] text-left leading-tight sm:inline">
          <span className="block truncate text-[13px] font-semibold text-gray-900">{user.name}</span>
          <span className="block text-[11px] text-gray-500">{user.role}</span>
        </span>
        <ChevronDown className="hidden h-4 w-4 shrink-0 text-gray-400 sm:inline" />
      </button>
    </div>
  </header>
)

export default DashboardTopbar
