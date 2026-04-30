export interface SectionProps {
  className?: string
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export interface CardProps extends SectionProps {
  children: React.ReactNode
  variant?: 'default' | 'service' | 'work'
}

export interface Service {
  id: string
  number: string
  name: string
  description: string
  tag: string
}

export interface SolutionCard {
  id: string
  number: string
  title: string
  description: string
  services: string[]
}

export interface TeamMemberExtended {
  id: string
  name: string
  role: string
  title: string
  bio: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  title: string
}

export interface Work {
  id: string
  title: string
  category: string
  client: string
  tag: string
  bgColor: string
}
