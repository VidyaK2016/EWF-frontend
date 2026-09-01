import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MailOpen, Lock, Eye, EyeOff } from 'lucide-react'
import AuthLayout from './AuthLayout'
import AuthHeading from './AuthHeading'
import AppInput from '../common/AppInput'
import AppButton from '../common/AppButton'
import AppCheckbox from '../common/AppCheckbox'
import AppDivider from '../common/AppDivider'
import ErrorBanner from '../common/ErrorBanner'
import { validateLoginEmail, validateLoginPassword } from '../../utils/validation'
import { authenticate, MAX_LOGIN_ATTEMPTS } from '../../utils/auth'
import { SOCIAL_PROVIDERS } from '../../utils/socialIcons'

const LoginForm = ({ onSso, onLoggedIn }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState({})
  const [authError, setAuthError] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const clearFeedback = () => {
    if (authError) setAuthError(false)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
    clearFeedback()
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }))
    clearFeedback()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const nextErrors = {
      email: validateLoginEmail(email),
      password: validateLoginPassword(password),
    }

    if (nextErrors.email || nextErrors.password) {
      setErrors(nextErrors)
      setAuthError(false)
      return
    }

    setErrors({})

    if (authenticate({ email, password })) {
      setAuthError(false)
      setAttempts(0)
      onLoggedIn?.({ email, remember })
      return
    }

    setAuthError(true)
    setAttempts((n) => Math.min(n + 1, MAX_LOGIN_ATTEMPTS))
  }

  return (
    <AuthLayout wide>
      <AuthHeading title="Welcome back" emoji="👋🏻" subtitle="Please enter your account details" />

      {authError && (
        <ErrorBanner
          message="Incorrect Email or Password. Please try again"
          subMessage={`Attempt of ${attempts} / ${MAX_LOGIN_ATTEMPTS}`}
        />
      )}

      <form onSubmit={handleSubmit} className={authError ? 'mt-4 short:mt-2' : 'mt-5 short:mt-3'} noValidate>
        <AppInput
          id="email"
          label="Email"
          required
          type="email"
          autoComplete="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleEmailChange}
          error={errors.email}
          icon={<MailOpen className="h-5 w-5" />}
        />

        <AppInput
          className="mt-4 short:mt-2.5"
          id="password"
          label="Password"
          required
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          error={errors.password}
          isPassword={Boolean(password) && !showPassword}
          icon={<Lock className="h-5 w-5" />}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="shrink-0 text-orange-500 transition-colors hover:text-[#CE5A0C]"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          }
        />

        <div className="mt-4 short:mt-2.5 flex w-full items-center justify-between gap-3">
          <AppCheckbox
            id="remember-me"
            label="Remember me"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />

          <Link
            to="/forgot-password"
            className="text-right text-xs font-bold leading-[22px] tracking-normal text-[#F36A0E] hover:text-[#CE5A0C]"
          >
            Forgot password ?
          </Link>
        </div>

        <AppButton type="submit" className="mt-5 short:mt-3">
          Login
        </AppButton>

        <AppButton type="button" variant="secondary" className="mt-3 short:mt-2" onClick={onSso}>
          Login using SSO
        </AppButton>
      </form>

      <AppDivider label="Or Login with" className="my-5 short:my-3" />

      <div className="mx-auto flex items-center justify-center gap-12">
        {SOCIAL_PROVIDERS.map(({ key, label, src, url }) => (
          <AppButton
            key={key}
            type="button"
            variant="icon"
            aria-label={label}
            onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
          >
            <img src={src} alt="" aria-hidden="true" className="h-[26px] w-[26px] object-cover" />
          </AppButton>
        ))}
      </div>

      <p className="mt-5 short:mt-3 text-center text-sm font-medium leading-[22px] tracking-normal text-black">
        Don&apos;t have an account?{' '}
        <Link to="/create-account" className="font-bold text-[#F36A0E] hover:text-[#CE5A0C]">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  )
}

export default LoginForm
