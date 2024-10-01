import { Container, Grid } from "semantic-ui-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CompanyRegistrationForm from "./company-registration-form";
import SignUpPage from "./sign-up";
import Image from "next/image";

export function SignUpTabs() {
  return (
    <>
      <Grid stackable style={{ height: "100%", borderRadius: '20px', padding: '10em 0'}} centered columns={2}>
        <Grid.Column
          width={6}
          style={{ padding: "2em 2em", textAlign: "center" }}
          // className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-1 xl:min-h-[800px]"

        >
          <Tabs defaultValue="account" className="">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="account">For Lenders</TabsTrigger>
              <TabsTrigger value="password">For Loanees</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Grid stackable style={{ height: "100%" }}>
                <Grid.Column
                  // width={6}
                  style={{ padding: "0em 1em", textAlign: "center" }}
                >
                  <Container
                    style={{ textAlign: "center", margin: "2em auto" }}
                  >
                    <CompanyRegistrationForm />
                  </Container>
                </Grid.Column>
              </Grid>
            </TabsContent>
            <TabsContent value="password">
              <Grid stackable style={{ height: "100%" }}>
                <Grid.Column
                  // width={6}
                  style={{ padding: "0em 1em", textAlign: "center" }}
                >
                  <Container
                    style={{ textAlign: "center", margin: "2em auto" }}
                  >
                    <SignUpPage />
                  </Container>
                </Grid.Column>
              </Grid>
            </TabsContent>
          </Tabs>
        </Grid.Column>
        <Grid.Column
          // width={6}
          style={{ padding: "2em 2em", textAlign: "center" }}
        >
          <div className="hidden bg-muted lg:block" style={{ borderRadius: '20px' }}>
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="2180"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
    </div>
          </Grid.Column>{" "}
      </Grid>

      {/* <CompanyRegistrationForm /> */}
    </>
  );
}
