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
import { Container, Grid, GridColumn } from "semantic-ui-react";
import { BenefitsInterface } from "@/assets/interfaces";
import styles from "./Cards.module.css";
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
    <section className={styles.benefitsContent}>
      <Grid columns='equal' stackable>
        <Grid.Row></Grid.Row>

        <Grid.Row columns={3}>
          <Container>
            <h1 className={styles.featureHeading}>Features</h1>
          </Container>
          {benefits.map((benefit, key) => (
            <GridColumn>
              <BenefitsCard
                key={key}
                title={benefit.title}
                description={benefit.description}
              />
            </GridColumn>
          ))}
        </Grid.Row>
      </Grid>
    </section>
  );
}

export default BenefitSection;
