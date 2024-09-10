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
  // const router = useRouter();
  const handleButtonClick = () => {
    setEnableButton(!enableButton);
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
    <Grid stackable columns={2} style={{ height: "100%" }}>
      <Grid.Column width={10} style={{ padding: "0em 5em" }}>
        {/* <Container style={{ textAlign: "start", margin: "0em auto" }}>
          <Image
            src="/images/light.png"
            width={150}
            height={150}
            alt="image with cards"
          ></Image>
        </Container> */}
        <Container style={{ textAlign: "center", width: "640px" }}>
          <Container style={{ textAlign: "center", margin: "2em auto" }}>
            <Grid.Column width={10}>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-2/3 space-y-6"
                >
                  <Container
                    style={{ textAlign: "center", margin: "2em auto" }}
                  >
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
                          onValueChange={field.onChange}
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
                      Already have an account? <a href="">Log In</a>
                    </p>
                  </Container>
                </form>
              </Form>
            </Grid.Column>
          </Container>
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
