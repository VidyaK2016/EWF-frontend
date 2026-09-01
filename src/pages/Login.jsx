import { useState } from 'react'
import LoginForm from '../components/auth/LoginForm.jsx'
import SsoForm from '../components/auth/SsoForm.jsx'

const Login = ({ onLoggedIn }) => {
  const [useSso, setUseSso] = useState(false)

  if (useSso) {
    return <SsoForm onBack={() => setUseSso(false)} />
  }

  return <LoginForm onSso={() => setUseSso(true)} onLoggedIn={onLoggedIn} />
}

export default Login
