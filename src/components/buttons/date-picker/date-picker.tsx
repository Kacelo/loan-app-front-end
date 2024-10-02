"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ControllerRenderProps } from "react-hook-form"
interface datePickerProps{
    // setDateFunction: React.Dispatch<React.SetStateAction<Date | undefined>>
    field : ControllerRenderProps<{
      amount: number[];
     
      endDate: Date;
      // comments: string;
      // totalRepayment: number;
  }, "endDate">
}
export function DatePickerDemo(props: datePickerProps) {
    const {field} = props
  // const [date, setDate] = React.useState<Date>()
  // const handleDate = (date: React.SetStateAction<Date | undefined>)=>{
  //   setDate(date)
  //   setDateFunction(date)
  // }
console.log('Date:',field.value)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !field.value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
