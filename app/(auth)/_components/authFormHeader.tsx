import React from "react";

type AuthFormHeaderProps = {
  type: "login" | "register";
};

const AuthFormHeader: React.FC<AuthFormHeaderProps> = ({ type }) => {
  const headerContent = {
    login: {
      title: "Login to your account",
      content:
        "By improving 1% a day, after 70 days ... \n you will have doubled your skill level 🧠",
    },
    register: {
      title: "Create a new account",
      content:
        "If it be not to come, it will be now. If it be not now, yet it will come – the readiness is all 🧠",
    },
  };

  const { title, content } = headerContent[type];

  return (
    <div className="flex flex-col mb-4">
      <h1 className="text-3xl text-devready-green font-bold">{title}</h1>
      <p className="pt-3 italic text-sm">{content}</p>
    </div>
  );
};

export default AuthFormHeader;
