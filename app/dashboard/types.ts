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
  type: TransactionType
  date: Date
}

export enum TransactionType {
  EXPENSE = "EXPENSE",
  EARNING = "EARNING",
  INVESTMENT = "INVESTMENT",
}
