"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MONTHS } from "@/data/date"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

export const TransactionSelectDate = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentMonth =
    searchParams.get("selectedMonth") ||
    MONTHS[new Date().getMonth()].label

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("selectedMonth", value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Select onValueChange={handleValueChange} defaultValue={currentMonth}>
      <SelectTrigger className="max-w-32">
        <SelectValue placeholder={"Selecione uma data"} />
      </SelectTrigger>
      <SelectContent className="bg-card">
        {MONTHS.map((month) => (
          <SelectItem key={month.number} value={month.label}>
            {month.label_ptBr}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
