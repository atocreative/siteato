import type { SectionProps } from '@types'

interface CardProps extends SectionProps {
  children: React.ReactNode
  variant?: 'default' | 'service' | 'work'
}

export default function Card({ children, variant = 'default', className = '' }: CardProps) {
  const baseStyles = 'card-brutal p-8'

  const variants = {
    default: '',
    service: 'hover:bg-ato-green',
    work: ''
  }

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}
