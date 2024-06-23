export interface Balance {
  earnings: string
  expenses: string
  investments: string
  balance: string
}

export interface Transaction {
  id: string
  user_id: string
  name: string
  type: TransactionType
  amount: string
  date: string
}

export enum TransactionType {
  INVESTMENT = "INVESTMENT",
  EARNING = "EARNING",
  EXPENSE = "EXPENSE",
}
