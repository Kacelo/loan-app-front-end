"use client";

import { Heading2 } from "@/components/typography/typography";
import SignUpPage from "../../components/sign-up/sign-up";
import { SignUpTabs } from "@/components/sign-up/sign-up-tabs";

// import { Provider } from "react-redux";
// import store from "@/store";

export default function SignUp() {
  return (
    // <Provider store={store}>
    <>
      <SignUpTabs />
    </>
    // </Provider>
  );
}
