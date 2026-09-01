import { useRef } from 'react'

/**
 * Controlled group of single-digit code boxes.
 * The parent owns the digits array so it can clear the code (e.g. on resend).
 */
const OtpInput = ({
  digits,
  onChange,
  label = 'Verification code',
  required = true,
  invalid = false,
  className = '',
}) => {
  const inputsRef = useRef([])
  const length = digits.length

  const focusInput = (index) => {
    inputsRef.current[index]?.focus()
  }

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = digit
    onChange(next)
    if (digit && index < length - 1) focusInput(index + 1)
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      focusInput(index - 1)
    }
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    e.preventDefault()
    onChange(Array.from({ length }, (_, i) => pasted[i] ?? ''))
    focusInput(Math.min(pasted.length, length - 1))
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-xs font-bold leading-5.5 tracking-normal text-black">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="mt-3 short:mt-2 flex w-full max-w-xs gap-2 sm:gap-4">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={digit}
            aria-label={`Digit ${index + 1} of ${length}`}
            aria-invalid={invalid || undefined}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`aspect-square w-full min-w-0 max-w-14 flex-1 sm:max-w-16 rounded-xl bg-white border text-center text-lg sm:text-2xl font-semibold text-gray-800 shadow-sm outline-none focus:ring-2 focus:ring-orange-400 ${
              invalid ? 'border-red-400' : 'border-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default OtpInput
