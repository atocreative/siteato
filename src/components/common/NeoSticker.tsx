import { motion } from 'framer-motion'

interface NeoStickerProps {
  text: string
  color: 'yellow' | 'orange' | 'blue' | 'purple' | 'red'
  size?: 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
}

const colorMap = {
  yellow: 'bg-ato-yellow',
  orange: 'bg-ato-orange',
  blue: 'bg-ato-blue',
  purple: 'bg-ato-purple',
  red: 'bg-ato-red'
}

const sizeMap = {
  sm: 'text-xs px-3 py-1',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-3'
}

const rotations = [-3, -6, 2, 5, -4, 3, -2]
const randomRotation = () => rotations[Math.floor(Math.random() * rotations.length)]

export default function NeoSticker({ text, color, size = 'md', style }: NeoStickerProps) {
  return (
    <motion.div
      className={`${colorMap[color]} ${sizeMap[size]} border-4 border-ato-black font-display font-black font-bold uppercase tracking-widest text-ato-black shadow-brutal absolute z-10`}
      style={{
        transform: `rotate(${randomRotation()}deg)`,
        ...style
      }}
      whileHover={{ scale: 1.08 }}
    >
      {text}
    </motion.div>
  )
}
