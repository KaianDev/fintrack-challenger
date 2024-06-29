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
import { formatMoney } from "@/helpers"
import { TransactionType } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-muted-foreground"
        >
          Tipo
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell({ row }) {
      const type = row.getValue("type") as TransactionType
      return <TransactionBadge type={type} />
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-muted-foreground"
        >
          Data
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell({ row }) {
      const date = row.getValue("date") as string
      const daysLocal = dayjs(new Date(date))
      const formattedDate = daysLocal.tz(tz).utc().format("DD [de] MMMM YYYY")

      return <p className="truncate text-sm text-muted">{formattedDate}</p>
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-muted-foreground"
        >
          Valor
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
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
