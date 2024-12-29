export interface Timestamp {
  seconds: number
  nanoseconds: number
}

export interface Category {
  id: string
  name: string
  color: string
}

export interface Transaction {
  id: string
  date: Timestamp
  amount: number
  color: string
  category: Category
}

export interface FinanceGoal {
  collected: number
  goal: number
  description: string
}
