import { FormEvent, useState } from "react";
import { Container, Grid, Form, Input } from "semantic-ui-react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { TermsCheckBox } from "../checkbox/checkbox";

interface userDetails {
  username: string;
  email: string;
  password: string;
}
export default function SignUpPage() {
  const [enableButton, setEnableButton] = useState(false);
  // const router = useRouter();
  const handleButtonClick = () => {
    setEnableButton(!enableButton);
  };
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
  
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const username = formData.get("username") as string;
  
      if (!email || !password || !username) {
        throw new Error("All fields are required.");
      }
  
      const data = {
        username,
        password,
        email,
      };
    
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        data
      );
  
    } catch (error) {
      console.error("Error during submission:", error);
    }
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
            <h1 style={fontStyles}>Join Now</h1>
            <p style={fontStyles.secondaryFont}>Yup! its Free!</p>
          </Container>
          <Container>
            <Grid.Column width={4}>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  {/* {errors.email && touched.email ? (
                    <div>
                      <p style={{ color: "#CA0C00", fontSize: "11px" }}>
                        {errors.email}
                      </p>
                    </div>
                  ) : null} */}
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    // value={values.email}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                  />
                </Form.Field>

                <Form.Field>
                  {/* {errors.password && touched.password ? (
                    <div>
                      <p style={{ color: "#CA0C00", fontSize: "11px" }}>
                        {errors.password}
                      </p>
                    </div>
                  ) : null} */}
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    // value={values.password}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                  />
                </Form.Field>
                <Form.Field>
                  {/* {errors.username && touched.username ? (
                    <div>
                      <p style={{ color: "#CA0C00", fontSize: "11px" }}>
                        {errors.username}
                      </p>
                    </div>
                  ) : null} */}
                  <input
                    // label="my-linked-tree/"
                    placeholder="username"
                    name="username"
                    // value={values.username}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                  />
                </Form.Field>
                <Form.Field style={{ display: "inline-flex" }}>
                <TermsCheckBox handleClick={handleButtonClick} />
                </Form.Field>
                <Button style={{
                    width: "-webkit-fill-available",
                    borderRadius: "20px",
                  }}
                  disabled={!enableButton}
                  >
                Create Account
                </Button>
              </Form>
              <Container style={{ margin: "2em 0" }}>
                <p style={fontStyles.secondaryFont}>
                  Already have an account? <a href="">Log In</a>
                </p>
              </Container>
            </Grid.Column>
          </Container>
        </Container>
      </Grid.Column>
      {/* <Grid.Column
        width={6}
        style={{
          height: "auto",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage: "url(images/signup6.png)",
        }}
      ></Grid.Column> */}
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
