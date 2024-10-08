import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Container, Grid } from "semantic-ui-react";
import { BenefitsInterface } from "@/assets/interfaces";
import styles from './Cards.module.css'
interface BenefitsArrayInterface {
  benefits: BenefitsInterface[];
}
export function BenefitsCard({ title, description }: BenefitsInterface) {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}

function BenefitSection(props: BenefitsArrayInterface) {
  const { benefits } = props;
  return (
    <>
      <Container>
        <Grid>
          <Grid.Row>
            <Container>
              <h1 className={styles.featureHeading}>Features</h1>
            </Container>
          </Grid.Row>
          <Grid.Row>
            {benefits.map((benefit, key) => (
              <BenefitsCard
                key={key}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
}

export default BenefitSection;
