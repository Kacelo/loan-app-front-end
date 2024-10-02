import { SliderProps } from "@radix-ui/react-slider";
import { Label } from "../ui/label";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Slider } from "../ui/slider";
import { ControllerRenderProps } from "react-hook-form";


interface LoanAmountProps{
    maximumAmount: SliderProps['max']
    defaultValue: SliderProps["defaultValue"]
    setLoanAmount:  Dispatch<SetStateAction<number | undefined>>
    field : ControllerRenderProps<{
        amount: number[];
        endDate: Date;
    }, "amount">
}
export function LoanAmountSlider({maximumAmount, defaultValue, setLoanAmount, field}: LoanAmountProps){
    const [value, setValue] = useState(defaultValue)
    useEffect(() => {
      handleLoanAmount(field.value)
    
      return () => {
    
      }
    }, [field.value])
    
    const handleLoanAmount = (amount: number[] | undefined) =>{
        setValue(amount);
        const amount1 = amount? amount[0] : 0;
        setLoanAmount(amount1)
    }
    // console.log('value from slider', value)
    return(
        <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="maxlength">How much do you need?</Label>
          <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
            N${field.value}
          </span>
        </div>
        <Slider
          id="maxlength"
          max={maximumAmount}
          defaultValue={defaultValue}
          step={100}
          onValueChange={field.onChange}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          aria-label="Maximum Length"
        />
      </div>
    )
}