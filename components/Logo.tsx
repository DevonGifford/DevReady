import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  href: string;
}

export const Logo: React.FC<LogoProps> = ({ href }) => {
  return (
    <Link href={href} className="flex gap-0.5 font-bold text-2xl py-5 pl-3">
      <Image
        src="/landingpage/ZTM-logo.png"
        alt="ztmready logo"
        width={35}
        height={35}
        className="ml-0"
      />
      <span className="flex text-devready-green">ZTM</span>
      <span className="flex">Ready</span>
    </Link>
  );
};
