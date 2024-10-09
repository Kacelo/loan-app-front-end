import { Container, Grid } from "semantic-ui-react";
import LoanApplicationForm from "./forms/loan-form";

export function LoanApplicationComponent() {
  return (
    <Grid
      stackable
      style={{ height: "100%", borderRadius: "20px", padding: "10em 0" }}
      centered
      columns={2}
    >
      <Grid.Column
        width={8}
        style={{ padding: "2em 2em", textAlign: "center" }}
        // className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-1 xl:min-h-[800px]"
      >
        {/* <Container
          style={{ textAlign: "center", margin: "2em auto" }}
        > */}
            <LoanApplicationForm />
        {/* </Container> */}
      </Grid.Column>
    </Grid>
  );
}
