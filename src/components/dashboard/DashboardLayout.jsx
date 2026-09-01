import { useState } from 'react'
import { X } from 'lucide-react'
import IconRail from './IconRail'
import SidebarNav from './SidebarNav'
import DashboardTopbar from './DashboardTopbar'
import { CURRENT_USER } from '../../utils/currentUser'
import logo from '../../assets/Container.png'

const DashboardLayout = ({ title, header, children }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="flex h-screen flex-col bg-[#F6F6F6] font-sans">
      <DashboardTopbar user={CURRENT_USER} onMenuClick={() => setMobileNavOpen(true)} />

      <div className="flex min-h-0 flex-1">
        <div className="hidden shrink-0 items-start gap-3 p-3 lg:flex">
          <IconRail />
          <SidebarNav />
        </div>

        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileNavOpen(false)}
              aria-hidden="true"
            />
            <div className="relative flex h-full w-80 max-w-[88vw] flex-col bg-[#F6F6F6] shadow-xl">
              <div className="flex items-start justify-between gap-2 px-4 py-3.5">
                <span className="flex min-w-0 items-center gap-2">
                  <img src={logo} alt="" className="h-8 w-8 shrink-0 rounded-lg object-cover" />
                  <span className="font-inter text-[13px] font-bold leading-tight text-gray-900">
                    Enterprise collaboration workflow
                  </span>
                </span>
                <button
                  type="button"
                  aria-label="Close navigation"
                  onClick={() => setMobileNavOpen(false)}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex min-h-0 flex-1 items-start gap-3 px-3 pb-3">
                <IconRail />
                <SidebarNav onClose={() => setMobileNavOpen(false)} />
              </div>
            </div>
          </div>
        )}

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden p-4 sm:p-6 lg:p-8 lg:pl-3">
          {title && (
            <h1 className="mb-6 shrink-0 font-inter text-[24px] font-semibold leading-none tracking-normal text-black">
              {title}
            </h1>
          )}
          {header && <div className="mb-6 shrink-0">{header}</div>}
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
