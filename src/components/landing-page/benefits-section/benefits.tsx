import { benefitsData } from "@/assets/benefits-data";
import BenefitSection from "@/components/cards/benefits-cards";
console.log(benefitsData);
export const Benefits = () => {
  return (
    <>
      <BenefitSection benefits={benefitsData} />
    </>
  );
};
