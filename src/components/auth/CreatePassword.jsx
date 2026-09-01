import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import AuthHeading from './AuthHeading'
import EditableEmail from './EditableEmail'
import AppButton from '../common/AppButton'
import ErrorBanner from '../common/ErrorBanner'
import PasswordInput from '../common/PasswordInput'
import PasswordRules from '../common/PasswordRules'
import { isPasswordValid, passwordsMatch } from '../../utils/validation'

const ERRORS = {
  rules: "Password doesn't meet the acceptance criteria",
  match: "Password doesn't match. Please try again.",
}

const CreatePassword = ({ email, onEditEmail, onCreated }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [touched, setTouched] = useState({ password: false, confirmPassword: false })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('') // '' | 'rules' | 'match'
  const [isSaving, setIsSaving] = useState(false)

  const allRulesMet = isPasswordValid(password)
  const mismatch = confirmPassword.length > 0 && !passwordsMatch(password, confirmPassword)
  const showFailures = submitted || touched.password

  const passwordInvalid = error === 'match' || (showFailures && password.length > 0 && !allRulesMet)
  const confirmInvalid = error === 'match' || (touched.confirmPassword && mismatch)

  const clearError = () => {
    if (error) setError('')
    if (isSaving) setIsSaving(false)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    clearError()
  }

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value)
    clearError()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTouched({ password: true, confirmPassword: true })

    if (!isPasswordValid(password)) {
      setError('rules')
      return
    }

    if (!passwordsMatch(password, confirmPassword)) {
      setError('match')
      return
    }

    setError('')
    setIsSaving(true)

    // TODO: replace with a real "create account" API call
    onCreated?.(password)
  }

  return (
    <AuthLayout>
      <AuthHeading title="Create password" subtitle="Create a new password to login" />

      <div aria-live="polite">{error && <ErrorBanner message={ERRORS[error]} />}</div>

      <EditableEmail email={email} onEdit={onEditEmail} className={error ? 'mt-4 short:mt-2.5' : 'mt-5 short:mt-3'} />

      <form onSubmit={handleSubmit} className="mt-6 short:mt-3" noValidate>
        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          invalid={passwordInvalid}
          describedBy="password-rules"
        />

        <PasswordRules id="password-rules" password={password} showFailures={showFailures} />

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Re - enter your password"
          value={confirmPassword}
          onChange={handleConfirmChange}
          onBlur={() => setTouched((t) => ({ ...t, confirmPassword: true }))}
          invalid={confirmInvalid}
          className="mt-6 short:mt-3"
        />

        <AppButton type="submit" className="mt-8 short:mt-4" disabled={isSaving}>
          {isSaving ? 'Creating account…' : 'Create Account'}
        </AppButton>
      </form>

      <div className="mt-6 short:mt-3 text-center">
        <Link
          to="/login"
          className="text-sm font-bold leading-5.5 tracking-normal text-[#F36A0E] hover:text-[#CE5A0C]"
        >
          Back to Login
        </Link>
      </div>
    </AuthLayout>
  )
}

export default CreatePassword
