import { useState } from 'react'
import { Mail } from 'lucide-react'
import AuthLayout from './AuthLayout'
import AuthHeading from './AuthHeading'
import AppInput from '../common/AppInput'
import AppButton from '../common/AppButton'
import ErrorBanner from '../common/ErrorBanner'
import { validateLoginEmail } from '../../utils/validation'
import { isSsoEnabled } from '../../utils/auth'

const SsoForm = ({ onBack, onSsoStarted }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [ssoError, setSsoError] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
    if (ssoError) setSsoError(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationError = validateLoginEmail(email)
    if (validationError) {
      setError(validationError)
      setSsoError(false)
      return
    }
    setError('')

    if (!isSsoEnabled(email)) {
      setSsoError(true)
      return
    }

    setSsoError(false)
    // TODO: redirect to the identity provider
    onSsoStarted?.(email)
  }

  return (
    <AuthLayout wide>
      <AuthHeading title="Welcome back" emoji="👋🏻" subtitle="Please enter your account details" />

      {ssoError && (
        <ErrorBanner message="Your account is not configured to use SSO. Please log in with Google or a password." />
      )}

      <form onSubmit={handleSubmit} className={ssoError ? 'mt-4 short:mt-2' : 'mt-7 short:mt-4'} noValidate>
        <AppInput
          id="sso-email"
          label="Email"
          required
          type="email"
          autoComplete="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleEmailChange}
          error={error}
          icon={<Mail className="h-5 w-5" />}
        />

        <AppButton type="submit" className="mt-6 short:mt-4">
          Login
        </AppButton>

        <AppButton type="button" variant="linkBlock" className="mt-5 short:mt-3" onClick={onBack}>
          Login with Email &amp; Password
        </AppButton>
      </form>
    </AuthLayout>
  )
}

export default SsoForm
