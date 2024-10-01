// "use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  ToastWithTitle,
  successToast,
  errorsToast,
} from "../alertDialog/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { handleRoute } from "@/libs/helper-functions/router";
import { useRouter } from "next/navigation";
import { Heading2, MutedText } from "../typography/typography";
import { Container, Grid } from "semantic-ui-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});
function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { username, password } = values;
      const data = {
        username,
        password,
      };
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        data
      );
      if (response.status === 200) {
        errorsToast(toast, "Success", "Welcome back.");
        handleRoute("/dashboard", router);
      } else {
        errorsToast(toast, "Login Error", "Please Try Again");
      }
    } catch (error) {
      console.log("error", error);
    }
    console.log(values);
  }
  return (
    <Form {...form}>
      <Container style={{ width: "60%", margin: "0 auto" }}>
        <Card>
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>Enter your username and password</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-3/3 space-y-8"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="username" {...field} />
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
                      <Input placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" style={{}}>
                Sign in
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div style={{ display: "flex" }}>
              <MutedText
                text="Don't have an account?"
                styles={{ margin: "auto, 0" }}
              />
              <Link href={"/sign-up"} style={{ fontSize: "small" }}>
                {" "}
                Create an account
              </Link>
            </div>{" "}
          </CardFooter>
        </Card>
      </Container>{" "}
    </Form>
  );
}

export default LoginForm;
