import { useState } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import AppInput from './AppInput'

/**
 * Password field built on top of AppInput.
 * Owns its own show/hide state so callers only deal with the value.
 * Letter-spacing is only applied while the value is masked.
 */
const PasswordInput = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  invalid = false,
  describedBy,
  className = '',
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <AppInput
      id={id}
      label={label}
      required
      className={className}
      type={visible ? 'text' : 'password'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={invalid}
      hideErrorMessage
      isPassword={!visible}
      autoComplete="new-password"
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      icon={<Lock className="h-5 w-5" />}
      rightElement={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          aria-pressed={visible}
          className="shrink-0 rounded-md p-1 text-[#F36A0E] outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-orange-400"
        >
          {visible ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
        </button>
      }
    />
  )
}

export default PasswordInput
