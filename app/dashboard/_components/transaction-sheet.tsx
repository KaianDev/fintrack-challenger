"use client"

import { CalendarIcon, ExternalLink } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Components
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
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
import { Calendar, CalendarProps } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"
import { TransactionSelectButton } from "./transaction-select-button"

const transactionFormSchema = z.object({
  title: z.string().min(1, "Campo obrigatório"),
  type: z.nativeEnum(TransactionType, { required_error: "Campo obrigatório" }),
  amount: z.coerce
    .number({ required_error: "Campo obrigatório" })
    .positive("O valor precisa ser maior que 0"),
  date: z.date({ required_error: "Campo obrigatório" }),
})

export const TransactionSheet = () => {
  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="-mr-6 flex h-10 w-16 items-center justify-center text-muted transition-colors hover:text-white">
          <ExternalLink size={16} className="" />
        </button>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="border-b px-5 py-6">
          <SheetTitle className="title leading-none text-white">
            Transação
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1">
          <Form {...form}>
            <form className="h-full flex flex-col justify-between pb-6 px-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={() => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input
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
                  render={() => (
                    <FormItem>
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
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
                                <span>Pick a date</span>
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
                <div className="grid grid-cols-3 gap-4">
                  <TransactionSelectButton
                    type={TransactionType.REVENUE}
                    selected={true}
                  />
                  <TransactionSelectButton
                    type={TransactionType.EXPENSE}
                    selected={false}
                  />
                  <TransactionSelectButton
                    type={TransactionType.INVESTMENT}
                    selected={false}
                  />
                </div>
              </div>

              <div className="mt-auto grid w-full grid-cols-2 gap-3">
                <SheetClose asChild>
                  <Button className="bg-[#1F1F21] text-white hover:bg-[#1F1F21]/70">
                    Cancelar
                  </Button>
                </SheetClose>
                <Button disabled type="submit">
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
