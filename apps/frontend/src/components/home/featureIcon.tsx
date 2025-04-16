import {
  ArrowUpRightIcon,
  ArrowDownLeftIcon,
  ArrowLeftRightIcon,
  CircleDollarSignIcon,
} from 'lucide-react'

export function FeatureIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'send':
      return <ArrowUpRightIcon className="w-6 h-6" />
    case 'receive':
      return <ArrowDownLeftIcon className="w-6 h-6" />
    case 'swap':
      return <ArrowLeftRightIcon className="w-6 h-6" />
    case 'earn':
      return <CircleDollarSignIcon className="w-6 h-6" />
    default:
      return <ArrowUpRightIcon className="w-6 h-6" />
  }
}

export {
  ArrowUpRightIcon,
  ArrowDownLeftIcon,
  ArrowLeftRightIcon,
  CircleDollarSignIcon,
}
