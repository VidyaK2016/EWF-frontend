import { useLayoutEffect, useRef, useState } from 'react'
import bgImage from '../../assets/auth.png'

const GUTTER = 24
// Below this the card would be unreadable, so we let the page scroll instead.
const MIN_SCALE = 0.75

const AuthLayout = ({ children, dense = false, wide = false }) => {
  const cardRef = useRef(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const card = cardRef.current
    if (!card) return undefined

    const fit = () => {
      // offsetHeight is the layout height, so the transform can't feed back into it.
      const natural = card.offsetHeight
      const available = window.innerHeight - GUTTER
      if (!natural || !available) return

      const next = natural > available ? Math.max(MIN_SCALE, available / natural) : 1
      setScale((prev) => (Math.abs(prev - next) < 0.005 ? prev : next))
    }

    fit()

    const observer = new ResizeObserver(fit)
    observer.observe(card)
    window.addEventListener('resize', fit)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [])

  const clamped = scale <= MIN_SCALE

  return (
    <div
      className={`h-dvh min-h-dvh w-full flex items-center justify-center bg-cover bg-center px-4 ${
        clamped ? 'overflow-y-auto py-6' : 'overflow-hidden py-0'
      }`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        ref={cardRef}
        className={`w-full font-montserrat min-w-0 ${
          wide ? 'max-w-[498px]' : 'max-w-md'
        } rounded-[28px] border-[3px] border-[#FFC49E] bg-orange-50/95 shadow-2xl backdrop-blur-sm ${
          dense ? 'p-6 sm:p-8 short:p-5' : 'p-7 sm:p-7 short:p-5'
        }`}
        style={scale === 1 ? undefined : { transform: `scale(${scale})`, transformOrigin: 'center' }}
      >
        {children}
      </div>
    </div>
  )
}

export default AuthLayout