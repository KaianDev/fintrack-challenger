import { LucideIcon } from "lucide-react"

interface TransactionTitleProps {
  icon: LucideIcon
  label: string
  color?: string
}

export const TransactionTitle = ({
  icon,
  label,
  color,
}: TransactionTitleProps) => {
  const Icon = icon

  return (
    <div className="flex items-center gap-2">
      <div className="w-max rounded-lg bg-white/10 p-2">
        <Icon size={16} className={color ?? "text-white"} />
      </div>
      <p className="text-sm text-muted">{label}</p>
    </div>
  )
}
