import { FormEvent, useEffect, useState } from "react";
import { Container, Grid, Input } from "semantic-ui-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TermsCheckBox } from "../checkbox/checkbox";
import "../../envConfigs";
import { handleRoute } from "@/libs/helper-functions/router";
import { errorsToast } from "../alertDialog/alert-dialog";
import { useToast } from "../ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Heading1,
  Heading2,
  Heading3,
  ParagraphText,
  TypographyLarge,
} from "../typography/typography";
import CompanyRegistrationForm from "./company-registration-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface userDetails {
  username: string;
  email: string;
  password: string;
}
const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  role: z.string().min(2).max(50),
});
function SignUpPage() {
  const [enableButton, setEnableButton] = useState(false);
  const [userRole, setUserRole] = useState("");

  // useEffect(() => {
  //   handleUserRoleClick()

  //   return () => {
  //   }
  // }, [third])

  // const router = useRouter();
  const handleButtonClick = () => {
    setEnableButton(!enableButton);
  };
  const handleUserRoleClick = (value: string) => {
    setUserRole(value);
  };
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      role: "Borrower",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { username, password, email, role, firstName, lastName } = values;

      const data = {
        firstName,
        lastName,
        username,
        password,
        email,
        role,
      };

      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/signup",
        data
      );
      console.log(response);
      if (response.status === 201) {
        console.log("res", response);
        errorsToast(toast, "Success", "Welcome");
        // handleRoute("/dashboard", router);
      } else {
        errorsToast(toast, "Login Error", "Please Try Again");
      }
    } catch (error) {
      console.log("error", error);
      errorsToast(toast, "Error", `${error}`);
    }
    console.log(values);
  }
  console.log(userRole);
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
             Sign Up
            </CardTitle>
            <CardDescription>
              Enter your details here. Click sign up when you're done.
            </CardDescription>
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

export default SignUpPage;
