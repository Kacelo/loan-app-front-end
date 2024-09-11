"use client";

import { ButtonLink } from "@/components/buttons/buttons";
import LoginForm from "@/components/login/login";
import { Heading1, Heading2, MutedText } from "@/components/typography/typography";
import Link from "next/link";
import { Container, Grid } from "semantic-ui-react";

export default function SignUp() {
  return (
    // <div>
      <Container>
        <Heading2 text="Sign in to your account" />
        <MutedText text='Enter your username and password'/>
        <LoginForm />
        {/* <Container> */}
          <div style={{display: 'flex'}}>
          <MutedText text="Don't have an account?" styles={{margin: 'auto, 0'}}/>
          <Link href={'/sign-up'} style={{fontSize:"small"}}> Create an account</Link>

        {/* <ButtonLink link={'/sign-up'} label={'Create an account'}/> */}
          </div>
      
        {/* </Container> */}
      </Container>      
    // </div>
  );
}
