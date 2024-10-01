"use client";

import { ButtonLink } from "@/components/buttons/buttons";
import LoanApplicationForm from "@/components/loans/forms/loan-form";
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
        Hello lets get you started
        <LoanApplicationForm />
      </Container>
    </Container>
    // </div>
  );
}