"use client"

import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import dayjs from "dayjs"

// Components
import { Button } from "@/components/ui/button"
import { TransactionType } from "@/data/enum"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TransactionSelectButton } from "./transaction-select-button"

// Utilities
import { cn } from "@/lib/utils"
import { TransactionFormData, transactionFormSchema } from "../schema"
import { TransactionDataType } from "@/data/transaction"

interface TransactionFormProps {
  data?: TransactionDataType
  onSubmit: (data: TransactionFormData) => void
  onClose: () => void
}

export const TransactionForm = ({
  data,
  onSubmit,
  onClose,
}: TransactionFormProps) => {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: data,
  })

  const handleSubmitForm = form.handleSubmit((data) => {
    onSubmit(data)
  })

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmitForm}
        className="flex h-full flex-col justify-between px-6 pb-6"
      >
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    autoComplete="off"
                    placeholder="Digite o título da transação"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    autoComplete="off"
                    placeholder="Digite o valor da transação"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          dayjs(field.value).format("DD [de] MMMM YYYY")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-3 gap-4"
                >
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem
                        value={TransactionType.REVENUE}
                        className="sr-only"
                      />
                    </FormControl>
                    <TransactionSelectButton
                      value={field.value}
                      type={TransactionType.REVENUE}
                    />
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem
                        value={TransactionType.EXPENSE}
                        className="sr-only"
                      />
                    </FormControl>
                    <TransactionSelectButton
                      value={field.value}
                      type={TransactionType.EXPENSE}
                    />
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem
                        value={TransactionType.INVESTMENT}
                        className="sr-only"
                      />
                    </FormControl>
                    <TransactionSelectButton
                      value={field.value}
                      type={TransactionType.INVESTMENT}
                    />
                  </FormItem>
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-auto grid w-full grid-cols-2 gap-3">
          <Button
            onClick={onClose}
            className="bg-[#1F1F21] text-white hover:bg-[#1F1F21]/70"
          >
            Cancelar
          </Button>

          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  )
}