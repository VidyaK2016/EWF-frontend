import DashboardLayout from '../components/dashboard/DashboardLayout'

const PlaceholderPage = ({ title }) => (
  <DashboardLayout title={title}>
    <div className="grid place-items-center rounded-2xl bg-white p-16 text-center shadow-sm">
      <p className="text-sm text-gray-500">This page is coming soon.</p>
    </div>
  </DashboardLayout>
)

export default PlaceholderPage
