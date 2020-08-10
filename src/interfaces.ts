export interface Account {
    archived: boolean
    default: boolean
    description: string
    iconName: string
    id: number
    name: string
    userId: number
    currentBalance: number
}

export interface Category {
    archived: boolean
    color: string
    iconName: string
    id: number
    name: string
    type: string
    userId: number
}
export interface Transaction {
    amount: number
    comment: string
    date: string
    destinationAccount: Account
    destinationAccountId: number
    effectiveAmount: number
    id: number
    categoryId: number
    sourceAccount: Account
    sourceAccountId: number
    type: string
    accountId: number
    account: Account
}
