"use client"

import { useTransition } from "react"
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
import { DeleteTransactionAlertDialog, TransactionSelectButton } from "."

// Utilities
import { cn } from "@/lib/utils"
import { TransactionFormData, transactionFormSchema } from "../../schema"
import { TransactionDataType } from "@/data/transaction"

interface TransactionFormProps {
  data?: TransactionDataType
  confirmLabel: string
  formType: "update" | "create"
  onSubmit: (data: TransactionFormData) => void
  onClose: () => void
}

export const TransactionForm = ({
  data,
  confirmLabel,
  formType = "create",
  onSubmit,
  onClose,
}: TransactionFormProps) => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: data,
  })

  const handleSubmitForm = form.handleSubmit((data) => {
    startTransition(async () => onSubmit(data))
  })

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmitForm}
        className="flex h-full flex-col justify-between gap-5"
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

          {formType === "update" && data && data.id && (
            <div className="flex justify-end">
              <DeleteTransactionAlertDialog
                id={data.id}
                onCloseSheet={onClose}
              />
            </div>
          )}
        </div>

        <div className="mt-auto grid w-full grid-cols-2 gap-3">
          <Button onClick={onClose} variant="cancel">
            Cancelar
          </Button>

          <Button disabled={isPending} type="submit">
            {confirmLabel}
          </Button>
        </div>
      </form>
    </Form>
  )
}
