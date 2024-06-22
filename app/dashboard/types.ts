export interface Balance {
  earnings: string
  expenses: string
  investments: string
  balance: string
}

export interface Transaction {
  id: string
  userId: string
  name: string
  type: TransactionType
  amount: string
}

export enum TransactionType {
  INVESTMENT = "INVESTMENT",
  EARNING = "EARNING",
  EXPENSE = "EXPENSE",
}
