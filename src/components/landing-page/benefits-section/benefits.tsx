import { benefitsData } from "@/assets/benefits-data";
import BenefitSection from "@/components/cards/benefits-cards";
import styles from "./benefits.module.css"
export const Benefits = () => {
  return (
    <section className={styles.benefitsContent}>
      <BenefitSection benefits={benefitsData} />
    </section>
  );
};
