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
} from "@/components/ui/popover"
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
} from "@/components/ui/command"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Heading1, Heading2 } from "../typography/typography";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { regions } from "@/assets/regions";
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
        "http://localhost:4000/api/v1/companies",
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
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? regions.find(
                            (region) => region.value === field.value
                          )?.label
                        : "Select Region"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {regions.map((region) => (
                          <CommandItem
                            value={region.label}
                            key={region.value}
                            onSelect={() => {
                              form.setValue("region", region.value)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                region.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {region.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
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
