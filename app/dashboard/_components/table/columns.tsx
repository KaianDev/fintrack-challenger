"use client"

import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import localeData from "dayjs/plugin/localeData"
import { ColumnDef } from "@tanstack/react-table"

dayjs.extend(localeData)
dayjs.locale("pt-br")

// Components
import { TransactionBadge, TransactionSheet } from "../transaction"

// Utilities
import { TransactionType } from "@/data/enum"
import { formatMoney } from "@/helpers/format-money"
import { Transaction } from "../../types"

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "title",
    header: "Título",
    cell({ row }) {
      const title = row.getValue("title") as string
      return <p className="truncate">{title}</p>
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell({ row }) {
      const type = row.getValue("type") as TransactionType
      return <TransactionBadge type={type} />
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell({ row }) {
      const date = row.getValue("date") as Date
      const formattedDate = dayjs(date).format("DD [de] MMMM YYYY")

      return <p className="truncate text-sm text-muted">{formattedDate}</p>
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell({ row }) {
      const amount = row.getValue("amount") as number
      const formattedAmount = formatMoney(amount)

      return <>{formattedAmount}</>
    },
  },
  {
    accessorKey: "action",
    header: "",
    cell({ row }) {
      const data = row.original
      return <TransactionSheet data={data} />
    },
  },
]
