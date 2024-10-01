"use client";

import { Heading2 } from "@/components/typography/typography";
import SignUpPage from "../../components/sign-up/sign-up";
import { SignUpTabs } from "@/components/sign-up/sign-up-tabs";
import { Container } from "semantic-ui-react";

// import { Provider } from "react-redux";
// import store from "@/store";

export default function SignUp() {
  return (
    // <Provider store={store}>
    <>
      <Container style={{ textAlign: "center", margin: "" }}>
        <SignUpTabs />
      </Container>
    </>
    // </Provider>
  );
}
