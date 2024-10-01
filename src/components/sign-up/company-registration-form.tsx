import { FormEvent, useState } from "react";
import { Container, Grid, Input } from "semantic-ui-react";
import axios, { AxiosResponse } from "axios";
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
import { Heading1, Heading2, Heading3 } from "../typography/typography";
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
import LenderRegistrationForm from "./forms/lender-registration-form";
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
function CompanyRegistrationForm() {
  // const { email } = props;
  const [enableButton, setEnableButton] = useState(false);
  const [response, setResponse] = useState<AxiosResponse>();
  const [companyEmail, setCompanyEmail] = useState("");
  // const router = useRouter();
  const handleButtonClick = () => {
    setEnableButton(!enableButton);
  };
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitting form with values:", values);
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

      const companyData = {
        name,
        address,
        email,
        city,
        region,
        phoneNumber,
        postalCode,
        registrationNumber,
      };

      const companyCreationResponse = await axios.post(
        "http://localhost:4000/api/v1/companies",
        companyData
      );
      setResponse(companyCreationResponse);
      setCompanyEmail(email);
      console.log("Company res:", companyCreationResponse);
      if (companyCreationResponse.status === 201) {
        errorsToast(toast, "Success", "Company Profile Created");
      } else {
        errorsToast(toast, "Sign Up Error", "Please Try Again");
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  }
  const lenderForm = () => {};

  return (
    <Card>
      {response?.status === 201 ? (
        <LenderRegistrationForm email={companyEmail} response={response} />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-3/3 space-y-5"
          >
            <CardHeader>
              <CardTitle>
                {" "}
               Company Registration
              </CardTitle>
              <CardDescription>
             Enter your company details here. Click save when you're done.
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
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
                        type="email"
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
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
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
                                    form.setValue("region", region.value);
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
                Save and Continue
              </Button>
            </CardContent>
          </form>
        </Form>
      )}
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

export default CompanyRegistrationForm;
