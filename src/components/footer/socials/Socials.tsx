import Link from "next/link";
import { FC } from "react";

interface SocialsProps {}

const Socials: FC<SocialsProps> = () => {
  return (
    <div>
      <Link href={""}>LinkedIn</Link>
      <Link href={""}>Github</Link>
      <Link href={""}>Instagram</Link>
    </div>
  );
};

export default Socials;
