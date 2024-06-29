import { $Enums } from "@prisma/client"
export interface Balance {
  earnings: number
  expenses: number
  investments: number
  balance: number
}

export interface TransactionData {
  id: string
  amount: number
  userId: string
  name: string
  type: $Enums.TransactionType
  date: Date
  category?: string
}
