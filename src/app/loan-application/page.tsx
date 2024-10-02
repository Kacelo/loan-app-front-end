"use client";

import { ButtonLink } from "@/components/buttons/buttons";
import LoanApplicationForm from "@/components/loans/forms/loan-form";
import { LoanApplicationComponent } from "@/components/loans/loan-application";
import LoginForm from "@/components/login/login";
import {
  Heading1,
  Heading2,
  MutedText,
} from "@/components/typography/typography";
import { Container, Grid } from "semantic-ui-react";

export default function SignUp() {
  return (
    // <div>
    <Container>
      <Container style={{marginTop: '2em'}}>
        {/* <LoginForm /> */}
        <LoanApplicationComponent />
      </Container>
    </Container>
    // </div>
  );
}