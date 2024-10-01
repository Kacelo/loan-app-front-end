import React, { FormEvent, useState } from "react";
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
import { Slider } from "@/components/ui/slider"

import { DatePickerDemo } from "@/components/buttons/date-picker/date-picker";
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
  amount: z.number().min(1), // Loan amount should be a number
  borrowerId: z.string().min(2).max(50),
  lenderId: z.string().min(2).max(50),
  interestRate: z.number().min(0), // Interest rate as a float number
  startDate: z.date(), // Date for the loan start
  endDate: z.date(), // Date for the loan end
  status: z.string().min(2).max(20), // Loan status like 'pending', 'approved'
  comments: z.string().max(500), // Optional comments
  totalRepayment: z.number().min(1), // New field for total repayment
});

function LoanApplicationForm() {
//   const { customerID, lenderID } = props;
  // const { email } = props;
  const [enableButton, setEnableButton] = useState(false);
  const [date, setDate] = React.useState<Date>();
  // const router = useRouter();
  const handleButtonClick = () => {
    setEnableButton(!enableButton);
  };
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "pending approval",
      lenderId: "lenderID",
      borrowerId: "customerID",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitting form with values:", values);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/signup",
        values
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
  console.log('Date1:',date)

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
              <Container style={{ textAlign: "center", margin: "2em auto" }}>
                <Heading3 text="Lets Get To Know You" />
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
                  <Slider
      defaultValue={[50]}
      max={5000}
      step={100}
      className={cn("w-[60%]")}
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
                <FormItem>
                  <FormControl>
                    <DatePickerDemo setDateFunction={setDate} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
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
            />
            {/* <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="password"
                      {...field}
                      style={{ width: "-webkit-fill-available" }}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
              Sign Up
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
