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
import { Input } from "@/components/ui/input"
import axios from "axios";
import { ToastWithTitle, successToast, errorsToast } from "../alertDialog/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { handleRoute } from "@/libs/helper-functions/router";
import { useRouter } from 'next/navigation'
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
  const router = useRouter()

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const {username, password} = values;
      const data = {
        username,
        password,
      }
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        data
      );
      if(response.status === 200){
        console.log('res',response)
        errorsToast(toast, "Success",'Welcome back.')
        handleRoute('/dashboard', router)
      }else{
        errorsToast(toast, "Login Error",'Please Try Again')
      }
    } catch (error) {
      console.log('error', error)
    }
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit" style={{}}  >Sign in</Button>
      </form>
    </Form>
  )
}

export default LoginForm;

