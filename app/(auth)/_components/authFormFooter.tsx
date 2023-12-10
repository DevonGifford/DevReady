import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type FooterContentType = {
  [key: string]: {
    buttonLabel: string;
    linkHref: string;
    linkLabel: string;
    linkTarget: string;
  };
};

const AuthFormFooter: React.FC<{ type: string }> = ({ type }) => {
  const footerContent: FooterContentType = {
    login: {
      buttonLabel: "Dont have an account?",
      linkHref: "/register",
      linkLabel: "Already have an account?",
      linkTarget: "/login",
    },
    register: {
      buttonLabel: "Already have an account?",
      linkHref: "/login",
      linkLabel: "Back to Home Page",
      linkTarget: "/",
    },
  };

  const { buttonLabel, linkHref, linkLabel, linkTarget } =
    footerContent[type] || footerContent.login;

  return (
    <div className="flex flex-col py-4">
      <Link href={linkTarget}>
        <Button type="button" variant="outline">
          {linkLabel}
        </Button>
      </Link>
      <Link href={linkHref}>
        <Button type="button" variant="outline">
          {buttonLabel}
        </Button>
      </Link>
    </div>
  );
};

export default AuthFormFooter;
