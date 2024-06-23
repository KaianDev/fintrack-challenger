export interface Balance {
  earnings: number
  expenses: number
  investments: number
  balance: number
}

export interface Transaction {
  id: string
  user_id: string
  name: string
  type: TransactionType
  amount: number
  date: Date
}

export enum TransactionType {
  INVESTMENT = "INVESTMENT",
  EARNING = "EARNING",
  EXPENSE = "EXPENSE",
}
