import { Globe, Diamond, KeyRound, Lock } from 'lucide-react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import SettingToggle from '../../components/authentication/SettingToggle'
import AuthProviderCard from '../../components/authentication/AuthProviderCard'

// Column-major order: the grid fills row by row across two columns, so this
// sequence renders as left [1,3,5] / right [2,4,6].
const SETTINGS = [
  { label: 'Require MFA for all users', on: true },
  { label: 'Auto-provision users from SSO', on: true },
  { label: 'Allow email/password login', on: true },
  { label: 'Sync user groups from IdP', on: false },
  { label: 'Enforce SSO for enterprise domains', on: false },
  { label: 'Block login from unknown devices', on: false },
]

const PROVIDERS = [
  {
    name: 'Google Workspace',
    icon: Globe,
    tone: 'black',
    status: 'active',
    detail: 'xxxx.apps.googleusercontent.com',
    userSync: true,
    groupSync: false,
    domain: 'acmecorp.com',
  },
  {
    name: 'Microsoft Entra',
    icon: Diamond,
    iconColor: 'text-blue-400',
    status: 'not-started',
  },
  {
    name: 'SAML 2.0',
    icon: KeyRound,
    status: 'active',
    detail: 'https://sso.acmecorp.com/saml',
    userSync: true,
    groupSync: true,
    domain: 'acmecorp.com',
  },
  {
    name: 'Okta',
    icon: Lock,
    iconColor: 'text-amber-400',
    status: 'not-started',
  },
]

const Authentication = () => (
  <DashboardLayout
    header={
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-inter text-[24px] font-semibold text-black">
          Authentication Management
        </h1>
        <button
          type="button"
          className="inline-flex h-12 shrink-0 items-center rounded-full bg-black px-6 text-[14px] font-medium text-white transition-colors hover:bg-gray-800"
        >
          Create role
        </button>
      </div>
    }
  >
    <div className="rounded-2xl border border-[#EDEDED] bg-white p-5 shadow-sm sm:p-6">
      <h2 className="font-inter text-[12px] font-bold leading-[17.5px] tracking-[0px] text-black">
        Global Authentication Settings
      </h2>

      <div className="mt-5 rounded-2xl bg-[#F3F3F3] p-5 sm:p-6">
        <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {SETTINGS.map((s) => (
            <SettingToggle key={s.label} label={s.label} defaultOn={s.on} />
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {PROVIDERS.map((p) => (
          <AuthProviderCard key={p.name} {...p} />
        ))}
      </div>
    </div>
  </DashboardLayout>
)

export default Authentication
