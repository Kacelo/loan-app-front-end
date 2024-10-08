import { benefitsData } from "@/assets/benefits-data";
import BenefitSection from "@/components/cards/benefits-cards";
export const Benefits = () => {
  return (
    <section>
      <BenefitSection benefits={benefitsData} />
    </section>
  );
};
