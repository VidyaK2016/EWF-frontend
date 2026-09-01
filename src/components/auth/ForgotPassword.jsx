import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MailOpen } from 'lucide-react'
import AuthLayout from './AuthLayout'
import AppInput from '../common/AppInput'
import AppButton from '../common/AppButton'
import ErrorBanner from '../common/ErrorBanner'
import { validateEmail } from '../../utils/validation'

const ForgotPassword = ({ onCodeSent }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationError = validateEmail(email)
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    onCodeSent?.(email)
  }

  return (
    <AuthLayout>
       <h1 className="text-2xl sm:text-[32px] font-extrabold leading-5.5 tracking-normal text-black">
        Forgot password ?
      </h1>
      <p className="mt-2 text-sm font-medium leading-5.5 tracking-normal text-black">
        Please enter your registered email address
      </p>

      {error && <ErrorBanner message={error} />}

      <form onSubmit={handleSubmit} className={error ? 'mt-4 short:mt-2.5' : 'mt-8 short:mt-4'} noValidate>
        <AppInput
          id="email"
          label="Email"
          required
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleEmailChange}
          error={error}
          hideErrorMessage
          icon={<MailOpen className="h-5 w-5" />}
        />

        <AppButton type="submit" className="mt-8 short:mt-4">
          Send Verification Code
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

export default ForgotPassword
