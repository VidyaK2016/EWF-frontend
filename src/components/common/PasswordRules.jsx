import { CircleCheck } from 'lucide-react'
import { getPasswordChecks } from '../../utils/validation'

// Labels live here (UI copy); the actual tests live in utils/validation.js
const RULES = [
  { key: 'length', label: '8 - 16 Characters' },
  { key: 'upperLowerCase', label: 'One upper case & one lower case' },
  { key: 'numberSpecialChar', label: 'Number and special character.' },
]

const RULE_COLORS = {
  neutral: 'text-black',
  met: 'text-[#00BC7D]',
  failed: 'text-[#EF4444]',
}

/**
 * Live checklist for the password policy.
 * `showFailures` lets the caller hold back the red state until the user has
 * committed (blurred or submitted), so the list doesn't scream while typing.
 */
const PasswordRules = ({ id, password, showFailures = false, className = 'mt-3 space-y-2.5 short:mt-2 short:space-y-1.5' }) => {
  const checks = getPasswordChecks(password)

  const ruleState = (met) => {
    if (!password) return 'neutral'
    if (met) return 'met'
    return showFailures ? 'failed' : 'neutral'
  }

  return (
    <ul id={id} className={className}>
      {RULES.map(({ key, label }) => (
        <li key={key} className={`flex items-center gap-2.5 ${RULE_COLORS[ruleState(checks[key])]}`}>
          <CircleCheck className="h-4 w-4 shrink-0" />
          <span className="text-xs leading-none">{label}</span>
        </li>
      ))}
    </ul>
  )
}

export default PasswordRules
