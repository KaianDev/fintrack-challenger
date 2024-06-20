import { faker } from "@faker-js/faker"
import { TransactionType } from "./enum"

export const transactionDataFaker = () => {
  return {
    id: faker.string.uuid(),
    amount: +faker.finance.amount({ min: 100, max: 2500 }),
    date: faker.date.anytime(),
    type: faker.helpers.enumValue(TransactionType),
  }
}

export const transactionData = faker.helpers.multiple(transactionDataFaker, {
  count: 10,
})
