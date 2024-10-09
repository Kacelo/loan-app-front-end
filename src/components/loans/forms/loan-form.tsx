import React, { FormEvent, useEffect, useState } from "react";
import { Container, Grid, Input } from "semantic-ui-react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { TermsCheckBox } from "../checkbox/checkbox";
// import "../../envConfigs";
import { handleRoute } from "@/libs/helper-functions/router";
import { errorsToast } from "../../alertDialog/alert-dialog";
import { useToast } from "../../ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Heading1, Heading2, Heading3 } from "../../typography/typography";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { regions } from "@/assets/regions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

import { DatePickerDemo } from "@/components/buttons/date-picker/date-picker";
import { Label } from "@/components/ui/label";
import { LoanAmountSlider } from "@/components/loan-slider/loan-slider";
import styles from "../forms/";
// import { lenderRegistrationSchema } from "../schemas/schemas";
interface userDetails {
  username: string;
  email: string;
  password: string;
  name: string;
  address: string;
  city: string;
  region: string;
  registrationNumber: string;
  phoneNumber: string;
  postalCode: string;
}
interface formProps {
  customerID: string;
  lenderID: string;

  //   response: AxiosResponse<any, any>
}
const formSchema = z.object({
  amount: z.number().array(), // Loan amount should be a number
  // borrowerId: z.string().min(2).max(50),
  // lenderId: z.string().min(2).max(50),
  // interestRate: z.number().min(0), // Interest rate as a float number
  // startDate: z.date(), // Date for the loan start
  endDate: z.date(), // Date for the loan end
  // status: z.string().min(2).max(20), // Loan status like 'pending', 'approved'
  // comments: z.string().max(500), // Optional comments
  // totalRepayment: z.number().min(1), // New field for total repayment
});

function LoanApplicationForm() {
  //   const { customerID, lenderID } = props;
  // const { email } = props;
  const [enableButton, setEnableButton] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const [loanAmount, setLoanAmount] = useState<number>();
  const [totalMoney, setTotalMoney] = useState<number>(0);
  // const router = useRouter();
  const handleButtonClick = () => {
    setEnableButton(!enableButton);
  };
  useEffect(() => {
    calculateTotalRepayment(loanAmount);

    return () => {};
  }, [loanAmount]);

  const calculateTotalRepayment = (amount: number | undefined) => {
    if (amount) {
      const repaymentAmount = (amount * 30) / 100;
      setTotalMoney(repaymentAmount + amount);
    }
  };
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitting form with values:", values);
    const { amount, endDate } = values;
    // Convert to a valid Date object
    const dateObject = new Date(endDate).toISOString();
    const startDateObj = new Date().toISOString();
    const applicationData = {
      amount: `${amount[0]}`,
      borrowerId: "66e2fc20a71e18b5f9f7c692",
      lenderId: "66fba53a40613bbcfb982dc1",
      interestRate: "15",
      startDate: startDateObj,
      endDate: dateObject,
      status: "Pending",
      comments: "",
      totalRepayment: totalMoney,
      deleted: false,
    };
    console.log("formatted maybe?", startDateObj, dateObject);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/loans/create",
        applicationData
      );
      console.log(res);

      if (res.status === 201) {
        errorsToast(toast, "Success", "Welcome");
        handleRoute("/dashboard", router);
      } else {
        errorsToast(toast, "Sign Up Error", "Please Try Again");
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  }
  return (
    <Card>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-3/3 space-y-5"
        >
          <CardHeader>
            <CardTitle>
              {" "}
              <Container style={{ textAlign: "center", margin: "" }}>
                {/* <Heading3 text="" /> */}
                Loan Application Form
              </Container>
            </CardTitle>
            {/* <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <LoanAmountSlider
                      maximumAmount={4000}
                      defaultValue={[0]}
                      setLoanAmount={setLoanAmount}
                      field={field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem style={{ textAlign: "start" }}>
                  <FormControl >
                    <DatePickerDemo field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="totalRepayment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      style={{ width: "-webkit-fill-available" }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormItem>
              <div className="flex items-center justify-between">
                <Label htmlFor="maxlength">Loan Amount</Label>
                <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                  N${loanAmount}
                </span>
              </div>
              <FormMessage />
            </FormItem>

            <FormItem>
              <div className="flex items-center justify-between">
                <Label htmlFor="maxlength">Interest</Label>
                <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                  {30}%
                </span>
              </div>
              <FormMessage />
            </FormItem>

            <FormItem>
              <div className="flex items-center justify-between">
                <Label htmlFor="maxlength">Total Repayment</Label>
                <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                  N${totalMoney}
                </span>
              </div>
              <FormMessage />
            </FormItem>

            {/* <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="email"
                      {...field}
                      style={{ width: "-webkit-fill-available" }}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      style={{ width: "-webkit-fill-available" }}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Button
              style={{
                width: "-webkit-fill-available",
                // borderRadius: "20px",
              }}
              // disabled={!enableButton}
              type="submit"
            >
              Apply Now
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
const fontStyles = {
  fontSize: "48px",
  letterSpacing: "-2px",
  fontWeight: "800",
  fontFamily: "__Inter_c0ea59",
  secondaryFont: {
    color: "rgb(103 107 95)",
  },
};

export default LoanApplicationForm;
