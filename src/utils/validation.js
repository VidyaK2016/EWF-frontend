const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// TODO: replace with a real "check email is registered" API call
const REGISTERED_EMAILS = ['support@gmail.com']

export const validateEmail = (email) => {
  const trimmed = email.trim()

  if (!trimmed) return 'Email is required'
  if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address'
  if (!REGISTERED_EMAILS.includes(trimmed.toLowerCase())) {
    return 'Your email address is not registered. Please enter your registered email.'
  }

  return ''
}

export const isValidEmailFormat = (email) => EMAIL_REGEX.test(email.trim())

export const validateName = (name) => {
  const trimmed = name.trim()

  if (!trimmed) return 'Name is required'
  if (trimmed.length < 2) return 'Please enter a valid name'

  return ''
}

// Signup is the mirror of validateEmail: here an existing account is the failure case.
export const validateCreateAccountEmail = (email) => {
  const trimmed = email.trim()

  if (!trimmed) return 'Email is required'
  if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address'
  if (REGISTERED_EMAILS.includes(trimmed.toLowerCase())) {
    return 'Entered email address is already registered. Try login'
  }

  return ''
}

// Login only needs a well-formed address; whether the account exists is
// decided by the login API call itself, not by a local allow-list.
export const validateLoginEmail = (email) => {
  const trimmed = email.trim()

  if (!trimmed) return 'Email is required'
  if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email'

  return ''
}

export const validateLoginPassword = (password) => {
  if (!password) return 'Please enter a valid password'
  return ''
}

export const validateOtp = (code, length) => {
  if (code.length < length) return 'Please enter a valid code'
  return ''
}

export const getPasswordChecks = (password) => {
  return {
    length: password.length >= 8 && password.length <= 16,
    upperLowerCase: /[a-z]/.test(password) && /[A-Z]/.test(password),
    numberSpecialChar: /\d/.test(password) && /[^A-Za-z0-9]/.test(password),
  }
}

export const isPasswordValid = (password) => {
  const checks = getPasswordChecks(password)
  return checks.length && checks.upperLowerCase && checks.numberSpecialChar
}

export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword
}
