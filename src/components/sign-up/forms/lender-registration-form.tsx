import { FormEvent, useState } from "react";
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
import { lenderRegistrationSchema } from "../schemas/schemas";
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
  email: string;
  response: AxiosResponse<any, any>
}
const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  role: z.string().min(2).max(50),
  address: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  city: z.string().min(2).max(50),
  region: z.string().min(2).max(50),
  phoneNumber: z.string().min(2).max(50),
  postalCode: z.string().min(2).max(50),
  registrationNumber: z.string().min(2).max(50),
});
function LenderRegistrationForm(props: formProps) {
    const {email, response} = props
  // const { email } = props;
  const [enableButton, setEnableButton] = useState(false);
  // const router = useRouter();
  const handleButtonClick = () => {
    setEnableButton(!enableButton);
  };
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof lenderRegistrationSchema>>({
    resolver: zodResolver(lenderRegistrationSchema),
    defaultValues: {
      role: "Lender",
    },
  });
  async function onSubmit(values: z.infer<typeof lenderRegistrationSchema>) {
    console.log("Submitting form with values:", values);
    try {
      const {
        firstName,
        lastName,
        role,
        username,
        password,
        email,
      } = values;

      console.log("Company res:", response);
      if (response.status === 201) {
        errorsToast(toast, "Success", "Company Profile Created");
        const userData = {
          firstName,
          lastName,
          username,
          password,
          email,
          role,
          companyId: response.data.id,
        };

        const res = await axios.post(
          "http://localhost:4000/api/v1/auth/signup",
          userData
        );
        console.log(res);

        if (res.status === 201) {
          errorsToast(toast, "Success", "Welcome");
          handleRoute("/dashboard", router);
        } else {
          errorsToast(toast, "Sign Up Error", "Please Try Again");
        }
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
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      {...field}
                      style={{ width: "-webkit-fill-available" }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      {...field}
                      style={{ width: "-webkit-fill-available" }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
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
            <FormField
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
            />
            <FormField
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
            />
            <FormField
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
            />
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

export default LenderRegistrationForm;
