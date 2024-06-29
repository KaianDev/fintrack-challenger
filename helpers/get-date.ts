import { MONTHS } from "@/data/date"

interface GetDateData {
  selectedMonth?: string
  selectedYear?: string
}

export const getDate = ({ selectedMonth, selectedYear }: GetDateData) => {
  const monthIndex = selectedMonth
    ? MONTHS.findIndex((m) => m.label === selectedMonth)
    : new Date().getMonth()

  const month =
    monthIndex !== -1 ? MONTHS[monthIndex].number : new Date().getMonth()

  // const month = selectedMonth ? Number(selectedMonth) : new Date().getMonth()
  const year = selectedYear ? Number(selectedYear) : new Date().getFullYear()
  const startDate = new Date(year, month, 1)
  const endDate = new Date(year, month + 1, 0)

  return {
    startDate,
    endDate,
  }
}
