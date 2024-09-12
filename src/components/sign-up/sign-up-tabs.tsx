import { Container, Grid } from "semantic-ui-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CompanyRegistrationForm from "./company-registration-form";
import SignUpPage from "./sign-up";

export function SignUpTabs() {
    return (
      <div>
        <Tabs defaultValue="account" className="">
          <TabsList>
            <TabsTrigger value="account">For Lenders</TabsTrigger>
            <TabsTrigger value="password">For Loanees</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
            

            </div>{" "} */}
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
        <CompanyRegistrationForm />
        </Container>
      </Grid.Column>
    </Grid>

          </TabsContent>
          <TabsContent value="password">
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
        <SignUpPage />
        </Container>
      </Grid.Column>
    </Grid>
          </TabsContent>
        </Tabs>
        {/* <CompanyRegistrationForm /> */}

      </div>
    );
  }