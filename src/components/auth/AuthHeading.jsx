const AuthHeading = ({
  title,
  subtitle = '',
  emoji = '',
  align = 'left',
  titleClassName = 'text-black',
  subtitleClassName = 'mt-2 short:mt-1 text-sm',
}) => {
  const centered = align === 'center'

  return (
    <div className={centered ? 'text-center' : ''}>
      <h1
        className={`flex items-center ${
          centered ? 'justify-center' : ''
        } text-2xl sm:text-[32px] short:text-2xl font-extrabold leading-tight tracking-normal ${titleClassName}`}
      >
        {title}
        {emoji && (
          <span className="ml-2" aria-hidden="true">
            {emoji}
          </span>
        )}
      </h1>
      {subtitle && (
        <p className={`font-medium leading-[22px] tracking-normal text-black ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default AuthHeading
