"use client"

import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import localeData from "dayjs/plugin/localeData"

dayjs.extend(localeData)
dayjs.locale("pt-br")

import { TransactionDataType } from "@/data/transaction"
import { TransactionType } from "@/data/enum"
import { TransactionBadge } from "../transaction-badge"
import { formatMoney } from "@/helpers/format-money"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { TransactionSheet } from "../transaction-sheet"

export const columns: ColumnDef<TransactionDataType>[] = [
  {
    accessorKey: "title",
    header: "Título",
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

      return <p className="text-sm text-muted">{formattedDate}</p>
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
    cell() {
      return <TransactionSheet />
    },
  },
]
