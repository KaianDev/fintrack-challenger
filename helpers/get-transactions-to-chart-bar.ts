import { TransactionData } from "@/app/dashboard/types"
import { TransactionType } from "@prisma/client"
import dayjs from "dayjs"

export const getTransactionsToChartBars = (
  transactionData: TransactionData[],
) => {
  const transactions = [] as {
    date: Date
    type: TransactionType
    label: number | string
    amount: number
  }[]
  for (let transaction of transactionData) {
    const { date, amount } = transaction

    const tIndex = transactions.findIndex(
      (t) =>
        t.type === transaction.type && +t.date.getTime() === +date.getTime(),
    )
    if (tIndex > -1) {
      transactions[tIndex].amount += amount
    } else {
      transactions.push({
        label: dayjs(date).format("DD"),
        amount: transaction.amount,
        type: transaction.type,
        date: transaction.date,
      })
    }
  }
  return transactions.sort((a, b) => {
    return +a.date.getDate() > +b.date.getDate() ? 1 : -1
  })
}
