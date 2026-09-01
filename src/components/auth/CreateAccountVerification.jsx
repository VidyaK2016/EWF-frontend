import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import AuthHeading from './AuthHeading'
import EditableEmail from './EditableEmail'
import AppButton from '../common/AppButton'
import ErrorBanner from '../common/ErrorBanner'
import OtpInput from '../common/OtpInput'
import { validateOtp } from '../../utils/validation'

const CODE_LENGTH = 4
const RESEND_SECONDS = 30

const CreateAccountVerification = ({ email, onEditEmail, onVerified }) => {
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(''))
  const [error, setError] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearInterval(timer)
  }, [secondsLeft])

  const handleChange = (next) => {
    setDigits(next)
    if (error) setError('')
  }

  const handleResend = () => {
    if (secondsLeft > 0) return
    setSecondsLeft(RESEND_SECONDS)
    setDigits(Array(CODE_LENGTH).fill(''))
    setError('')
    // TODO: trigger resend verification code API call
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const code = digits.join('')

    const validationError = validateOtp(code, CODE_LENGTH)
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    onVerified?.(code)
  }

  return (
    <AuthLayout>
      <AuthHeading
        title="Verification"
        subtitle={
          <>
            Please enter the 4 digits code sent to your <br />
            registered mail
          </>
        }
      />

      <EditableEmail email={email} onEdit={onEditEmail} className="mt-5 short:mt-3" />

      <form onSubmit={handleSubmit} className="mt-7 short:mt-4" noValidate>
        <OtpInput digits={digits} onChange={handleChange} invalid={Boolean(error)} />

        <div aria-live="polite">{error && <ErrorBanner message={error} show={false} />}</div>

        <p className="mt-4 short:mt-2.5 text-xs font-semibold leading-5.5 tracking-normal text-black">
          {secondsLeft > 0 ? (
            `Resend code in ${secondsLeft}(s)`
          ) : (
            <AppButton type="button" variant="link" onClick={handleResend}>
              Resend code
            </AppButton>
          )}
        </p>

        <AppButton type="submit" className="mt-8 short:mt-4">
          Continue
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

export default CreateAccountVerification
