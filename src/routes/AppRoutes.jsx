import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Login from '../pages/Login.jsx'
import ForgotPassword from '../components/auth/ForgotPassword.jsx'
import Verification from '../components/auth/Verification.jsx'
import ResetPassword from '../components/auth/ResetPassword.jsx'
import ResetSuccess from '../components/auth/ResetSuccess.jsx'
import CreateAccount from '../components/auth/CreateAccount.jsx'
import CreatePassword from '../components/auth/CreatePassword.jsx'
import CreateAccountVerification from '../components/auth/CreateAccountVerification.jsx'
import CreateAccountSuccess from '../components/auth/CreateAccountSuccess.jsx'
import PlaceholderPage from '../pages/PlaceholderPage.jsx'
import Dashboard from '../pages/dashboard/Dashboard.jsx'
import Authentication from '../pages/authentication/Authentication.jsx'


const LoginRoute = () => {
  const navigate = useNavigate()
  return <Login onLoggedIn={() => navigate('/dashboard', { replace: true })} />
}

const ForgotPasswordRoute = () => {
  const navigate = useNavigate()
  return <ForgotPassword onCodeSent={() => navigate('/verification')} />
}

const VerificationRoute = () => {
  const navigate = useNavigate()
  return <Verification onVerified={() => navigate('/reset-password')} />
}

const ResetPasswordRoute = () => {
  const navigate = useNavigate()
  return <ResetPassword onReset={() => navigate('/success', { replace: true })} />
}

const ResetSuccessRoute = () => {
  const navigate = useNavigate()
  return <ResetSuccess onBackToLogin={() => navigate('/login', { replace: true })} />
}

const CreateAccountRoute = ({ signup, onSubmit }) => {
  const navigate = useNavigate()
  return (
    <CreateAccount
      defaultValues={signup}
      onContinue={(details) => {
        onSubmit(details)
        navigate('/create-password')
      }}
    />
  )
}

const CreatePasswordRoute = ({ signup }) => {
  const navigate = useNavigate()

  // Reached directly (e.g. a refresh) with no email collected yet
  if (!signup.email) return <Navigate to="/create-account" replace />

  return (
    <CreatePassword
      email={signup.email}
      onEditEmail={() => navigate('/create-account')}
      // TODO: replace with a real "create account" API call
      onCreated={() => navigate('/create-account-verification')}
    />
  )
}

const CreateAccountVerificationRoute = ({ signup }) => {
  const navigate = useNavigate()

  if (!signup.email) return <Navigate to="/create-account" replace />

  return (
    <CreateAccountVerification
      email={signup.email}
      onEditEmail={() => navigate('/create-account')}
      onVerified={() => navigate('/create-account-success', { replace: true })}
    />
  )
}

const CreateAccountSuccessRoute = ({ onDone }) => {
  const navigate = useNavigate()
  return (
    <CreateAccountSuccess
      onBackToLogin={() => {
        onDone()
        navigate('/login', { replace: true })
      }}
    />
  )
}

const AppRoutes = () => {
  // Signup draft lives here so it survives the steps of the flow without
  // depending on location.state. TODO: move to a real signup API/session.
  const [signup, setSignup] = useState({ name: '', email: '' })

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginRoute />} />

      {/* Forgot password flow */}
      <Route path="/forgot-password" element={<ForgotPasswordRoute />} />
      <Route path="/verification" element={<VerificationRoute />} />
      <Route path="/reset-password" element={<ResetPasswordRoute />} />
      <Route path="/success" element={<ResetSuccessRoute />} />

      {/* Create account flow */}
      <Route
        path="/create-account"
        element={<CreateAccountRoute signup={signup} onSubmit={setSignup} />}
      />
      <Route path="/create-password" element={<CreatePasswordRoute signup={signup} />} />
      <Route
        path="/create-account-verification"
        element={<CreateAccountVerificationRoute signup={signup} />}
      />
      <Route
        path="/create-account-success"
        element={<CreateAccountSuccessRoute onDone={() => setSignup({ name: '', email: '' })} />}
      />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users-management" element={<PlaceholderPage title="Users Management" />} />
      <Route path="/department-management" element={<PlaceholderPage title="Department Management" />} />
      <Route path="/team-management" element={<PlaceholderPage title="Team Management" />} />
      <Route path="/roles-permissions" element={<PlaceholderPage title="Roles & Premissions" />} />
      <Route path="/workflow-config" element={<PlaceholderPage title="Workflow Config" />} />
      <Route path="/security" element={<PlaceholderPage title="Security" />} />
      <Route path="/authentication" element={<Authentication />} />
      <Route path="/audit-logs" element={<PlaceholderPage title="Audit Logs" />} />
      <Route path="/integrations" element={<PlaceholderPage title="Integrations" />} />
      <Route path="/usage-billing" element={<PlaceholderPage title="Usage & Billing" />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes
