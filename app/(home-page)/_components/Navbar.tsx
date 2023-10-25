import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../../../components/ThemeToggle";
import { Button } from "../../../components/ui/button";

const Navbar = () => {
  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/" className="flex gap-0.5 font-bold text-3xl">
        {/* TEMPORARY LOGO SOLUTION 🎯 */}
        <Image
          src="/landingpage/ZTM-logo.png"
          alt="ztmready logo"
          width={33}
          height={33}
          className="pb-2"
        />
        <span className="hidden sm:flex text-devready-green">ZTM</span>
        <span className="hidden sm:flex">Ready</span>
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </ul>

      <div className="flex gap-3 flexCenter">
        <Button type="button" title="Login" variant="devfill">
          Login
        </Button>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
