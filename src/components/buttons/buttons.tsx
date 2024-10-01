import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ButtonLinkProps {
  link: string;
  label: string
}
export function ButtonLink(props: ButtonLinkProps) {
  const { link, label } = props;
  return (
    <Button variant="link">
      {" "}
      <Link href={link}>{label}</Link>
    </Button>
  );
}
