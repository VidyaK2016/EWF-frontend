import { ArrowUpRight, ChevronDown } from 'lucide-react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatCard from '../../components/dashboard/StatCard'
import UserDistributionCard from '../../components/dashboard/UserDistributionCard'
import { CURRENT_USER } from '../../utils/currentUser'

const Dashboard = () => (
  <DashboardLayout>
    {/* Greeting + primary action */}
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-inter text-[36px] font-semibold leading-none tracking-[0px] text-black">
          Hi {CURRENT_USER.name}
        </h1>
        <p className="mt-1.5 text-[13px] text-gray-500">
          Stay on top of your tasks, Monitor progress, and track status.
        </p>
      </div>

      <button
        type="button"
        className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-black px-6 text-[14px] font-medium text-white transition-colors hover:bg-gray-800"
      >
        Create New
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>

    {/* Overview: stat grid + user distribution */}
    <div className="grid max-w-5xl gap-5 lg:grid-cols-2">
      <div className="rounded-2xl bg-[#F3F3F3] p-3">
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Total users" value="340" footer="28 Departments" highlight />
          <StatCard
            label="Active Users"
            value="312"
            footer={
              <span className="flex items-center gap-1.5">
                <span className="flex items-center gap-0.5 font-semibold text-emerald-500">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  8%
                </span>
                <span className="text-gray-400">Active rate</span>
              </span>
            }
          />
          <StatCard label="Workflow Volume" value="1,283" footer="This quarter" />
          <StatCard label="Storage Used" value="24 GB" footer="of 100 GB" />
        </div>
      </div>

      <UserDistributionCard />
    </div>
  </DashboardLayout>
)

export default Dashboard
