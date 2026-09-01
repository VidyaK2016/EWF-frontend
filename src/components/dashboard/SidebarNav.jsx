import { Link, useLocation } from 'react-router-dom'
import { DASHBOARD_NAV_ITEMS } from '../../utils/dashboardNav'

const SidebarNav = ({ onClose }) => {
  const { pathname } = useLocation()

  return (
    <nav className="flex h-full w-56 shrink-0 flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white py-4 shadow-sm">
      <ul className="min-h-0 flex-1 overflow-y-auto">
        {DASHBOARD_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={onClose}
                className={`relative block px-6 py-3 font-inter text-[13px] leading-[100%] tracking-[0px] transition-colors before:absolute before:left-0 before:top-1/2 before:h-5 before:w-[3px] before:-translate-y-1/2 before:rounded-r-full before:bg-[#F36A0E] before:transition-opacity ${
                  isActive
                    ? 'font-bold text-[#FC5F08] before:opacity-100'
                    : 'font-medium text-[#050505] before:opacity-0 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default SidebarNav
