import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MailOpen, User } from 'lucide-react'
import AuthLayout from './AuthLayout'
import AuthHeading from './AuthHeading'
import AppInput from '../common/AppInput'
import AppButton from '../common/AppButton'
import AppDivider from '../common/AppDivider'
import ErrorBanner from '../common/ErrorBanner'
import { validateCreateAccountEmail, validateName } from '../../utils/validation'
import { SOCIAL_PROVIDERS } from '../../utils/socialIcons'

const CreateAccount = ({ defaultValues = {}, onContinue }) => {
  const [name, setName] = useState(defaultValues.name ?? '')
  const [email, setEmail] = useState(defaultValues.email ?? '')
  const [errors, setErrors] = useState({})

  const banner = errors.name || errors.email

  const handleNameChange = (e) => {
    setName(e.target.value)
    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const nextErrors = {
      name: validateName(name),
      email: validateCreateAccountEmail(email),
    }

    if (nextErrors.name || nextErrors.email) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    onContinue?.({ name: name.trim(), email: email.trim() })
  }

  return (
    <AuthLayout wide>
      <AuthHeading title="Create your account" subtitle="Please enter your signup details to proceed" />

      <div aria-live="polite">{banner && <ErrorBanner message={banner} />}</div>

      <form onSubmit={handleSubmit} className={banner ? 'mt-4 short:mt-2' : 'mt-5 short:mt-3'} noValidate>
        <AppInput
          id="name"
          label="Name"
          required
          type="text"
          autoComplete="name"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
          error={errors.name}
          hideErrorMessage
          icon={<User className="h-5 w-5" />}
        />

        <AppInput
          className="mt-4 short:mt-2.5"
          id="email"
          label="Email"
          required
          type="email"
          autoComplete="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleEmailChange}
          error={errors.email}
          hideErrorMessage
          icon={<MailOpen className="h-5 w-5" />}
        />

        <AppButton type="submit" className="mt-8 short:mt-4">
          Continue
        </AppButton>
      </form>

      <AppDivider label="Or signup with" className="my-5 short:my-3" />

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
        Have an account?{' '}
        <Link to="/login" className="font-bold text-[#F36A0E] hover:text-[#CE5A0C]">
          Login now
        </Link>
      </p>
    </AuthLayout>
  )
}

export default CreateAccount
