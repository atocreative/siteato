import type { ButtonProps } from '@types'

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const baseStyles = 'btn-brutal font-sans text-xs font-bold tracking-widest'

  const variants = {
    primary: 'btn-brutal-primary',
    outline: 'btn-brutal-outline'
  }

  const sizes = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
