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

interface userDetails {
  username: string;
  email: string;
  password: string;
}
const formSchema = z.object({
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
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { username, password, email, role } = values;
      const companyData = { email };
      const companyResponse = await axios.post(
        "http://localhost:4000/api/v1/companies/find",
        companyData
      );

      if (companyResponse.status == 201) {
        const data = {
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
      } else {
      }
    } catch (error) {
      console.log("error", error);
      errorsToast(toast, "Error", `${error}`);
    }
    console.log(values);
  }
  console.log(userRole);
  return (
    <Grid stackable columns={2} style={{ height: "100%" }}>
      {/* <Grid.Column
        width={6}
        style={{ padding: "0em 5em", textAlign: "center" }}
      >
        {" "}
        <Container style={{ textAlign: "center", width: "640px" }}>
          <Container style={{ textAlign: "center", margin: "2em auto" }}>
            <Grid.Column width={10}>
              {userRole == "Lender" ? <CompanyRegistrationForm /> : ""}
            </Grid.Column>
          </Container>
        </Container>
      </Grid.Column> */}
      <Grid.Column
        width={6}
        style={{ padding: "0em 5em", textAlign: "center" }}
      >
        {/* <Container style={{ textAlign: "start", margin: "0em auto" }}>
          <Image
            src="/images/light.png"
            width={150}
            height={150}
            alt="image with cards"
          ></Image>
        </Container> */}
        <Container style={{ textAlign: "center", margin: "2em auto" }}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6 m-auto"
            >
              <Container style={{ textAlign: "center", margin: "2em auto" }}>
                <Heading1 text="Sign Up" />
              </Container>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="email"
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
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value); // Call the onChange function with the new value
                        handleUserRoleClick(value); // Call your custom function with the new value
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="framework">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent position="popper">
                        <SelectItem value="Borrower">Borrower</SelectItem>
                        <SelectItem value="Lender">Lender</SelectItem>
                      </SelectContent>
                    </Select>{" "}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {userRole == "Lender" ? (
                <div>
                  <p>
                    Before creating your lender profile, you should register a
                    company first.
                  </p>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Continue</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle></DialogTitle>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 items-center gap-4">
                          <CompanyRegistrationForm email={form.getValues().email} />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                        <Button type="button">Continue</Button>
                        </DialogClose>
                        {/*  */}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                ""
              )}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TermsCheckBox handleClick={handleButtonClick} />
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
                disabled={!enableButton}
                type="submit"
              >
                Sign Up
              </Button>
              <Container style={{ margin: "1em 0" }}>
                <p style={fontStyles.secondaryFont}>
                  Already have an account? <a href="/sign-in">Log In</a>
                </p>
              </Container>
            </form>
          </Form>
        </Container>
      </Grid.Column>
    </Grid>
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
