import { $Enums } from "@prisma/client"
export interface Balance {
  earnings: number
  expenses: number
  investments: number
  balance: number
}

export interface TransactionData {
  amount: number
  id: string
  userId: string
  name: string
  type: $Enums.TransactionType
  date: Date
}

