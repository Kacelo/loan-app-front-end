import { FormEvent, useState } from "react";
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
import { Heading1, Heading2 } from "../typography/typography";
interface userDetails {
  email: string;
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
}
const formSchema = z.object({
  name: z.string().min(2).max(50),
  address: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  city: z.string().min(2).max(50),
  region: z.string().min(2).max(50),
  phoneNumber: z.string().min(2).max(50),
  postalCode: z.string().min(2).max(50),
  registrationNumber: z.string().min(2).max(50),
});
function CompanyRegistrationForm(props: formProps) {
  const {email} = props
  const [enableButton, setEnableButton] = useState(false);
  // const router = useRouter();
  const handleButtonClick = () => {
    setEnableButton(!enableButton);
  };
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: email
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const {
        name,
        address,
        email,
        city,
        region,
        phoneNumber,
        postalCode,
        registrationNumber,
      } = values;
      const data = {
        name,
        address,
        email,
        city,
        region,
        phoneNumber,
        postalCode,
        registrationNumber,
      };
      
      const response = await axios.post(
        "http://localhost:4000/api/v1/company",
        data
      );
      if (response.status === 201) {
        errorsToast(toast, "Success", "Welcome");
        // handleRoute("/dashboard", router);
      } else {
        errorsToast(toast, "Login Error", "Please Try Again");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/3 space-y-5">
        <Container style={{ textAlign: "center", margin: "2em auto" }}>
          <Heading2 text="Company Registration" />
        </Container>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="company name"
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
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="City/Town"
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
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Region"
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
          name="registrationNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Registration Number"
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Phone Number"
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
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Postal Code"
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Address"
                  {...field}
                  style={{ width: "-webkit-fill-available" }}
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
          Register Company
        </Button>
      </form>
    </Form>
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

export default CompanyRegistrationForm;
