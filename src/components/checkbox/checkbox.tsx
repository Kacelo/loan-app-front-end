import { Checkbox } from "@/components/ui/checkbox"
interface CheckBoxProps {
    handleClick : ()=>void 
}
export function TermsCheckBox(props: CheckBoxProps) {
    const {handleClick} = props
    return (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" onClick={handleClick}/>
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
    )
  }
  