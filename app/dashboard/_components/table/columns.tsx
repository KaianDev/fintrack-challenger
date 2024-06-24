"use client"

import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { ColumnDef } from "@tanstack/react-table"

import type { TransactionData } from "../../types"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("pt-br")

const tz = process.env.NEXT_PUBLIC_TIMEZONE || "America/Fortaleza"

// Components
import { TransactionBadge, TransactionSheet } from "../transaction"

// Utilities
import { formatMoney } from "@/helpers/format-money"
import { TransactionType } from "@prisma/client"

export const columns: ColumnDef<TransactionData>[] = [
  {
    accessorKey: "name",
    header: "Título",
    cell({ row }) {
      const name = row.getValue("name") as string
      return <p className="truncate">{name}</p>
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
      const date = row.getValue("date") as string
      const daysLocal = dayjs(new Date(date))
      const formattedDate = daysLocal.tz(tz).utc().format("DD [de] MMMM YYYY")

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
