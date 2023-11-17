import { NAV_LINKS } from "@/constants/landingpage-index";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Logo } from "./Logo";

const Navbar = () => {
  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
        {/* TEMPORARY LOGO SOLUTION 🎯 */}
       <Logo href="/"/>

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
