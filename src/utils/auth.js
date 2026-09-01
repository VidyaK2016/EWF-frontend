// TODO: replace every mock in this file with real API calls (axios is already a dependency)

const MOCK_CREDENTIALS = {
  email: 'support@gmail.com',
  password: 'Password@123',
}

// Accounts provisioned for single sign-on
const SSO_ENABLED_EMAILS = ['admin@company.com']

export const MAX_LOGIN_ATTEMPTS = 5

export const authenticate = ({ email, password }) =>
  email.trim().toLowerCase() === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password

export const isSsoEnabled = (email) => SSO_ENABLED_EMAILS.includes(email.trim().toLowerCase())
