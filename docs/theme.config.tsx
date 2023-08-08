/* eslint-disable @next/next/no-img-element */
import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import Logo from "./components/Logo";

const config: DocsThemeConfig = {
  logo: <Logo />,
  project: {
    link: "https://github.com/DevonGifford/ZtmReady--PortfolioProject",
  },
  chat: {
    link: "https://zerotomastery.io/community/developer-community-discord/",
  },
  docsRepositoryBase:
    "https://github.com/DevonGifford/ZtmReady--PortfolioProject",
  footer: {
    text: "ZTM Ready Documentation 2024",
  },
};

export default config;
