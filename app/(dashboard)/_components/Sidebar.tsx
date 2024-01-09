"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SidebarItem } from "./SidebarItem";
import { useModalContext } from "@/components/providers/ModalReducerProvider";

import { Logo } from "@/components/Logo";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, UserSquare } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { sidebarQuickIndex, sidebarIndex } from "@/constants/sidebar-index";

export const Sidebar = () => {
  const router = useRouter();
  const { dispatch } = useModalContext();

  return (
    <div className="flex flex-col h-full">
      {/* LOGO */}
      <Logo href="/dashboard" />

      {/* QUICK LINKS */}
      <div className="pl-2">
        {sidebarQuickIndex.map(
          ({ label, icon, onClick, isMain, isSub, isMaster, isSearch }) => (
            <SidebarItem
              key={label}
              label={label}
              icon={icon as React.ElementType}
              onClick={() => {
                if (label === "Search Questions") {
                  dispatch({ type: "OPEN_MODAL", modalType: "SEARCH" });
                } else if (label === "Quick Settings") {
                  dispatch({ type: "OPEN_MODAL", modalType: "SETTINGS" });
                } else if (label === "User Dashboard") {
                  router.push("/user-dashboard");
                } else if (label === "Question Vault") {
                  router.push("/question-vault");
                } else if (label === "Create Flash Cards") {
                  router.push("/create-flashcards");
                }
              }}
              isMain={isMain}
              isSub={isSub}
              isMaster={isMaster}
              isSearch={isSearch}
            />
          )
        )}
      </div>

      <Separator className="my-3" />

      {/* FEATURES */}
      <Accordion type="single" collapsible className="w-full">
        {sidebarIndex.map(({ value, items }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-xl ml-2">
              {value}
            </AccordionTrigger>
            <AccordionContent>
              {items.map(
                ({
                  label,
                  icon,
                  href,
                  onClick,
                  isMain,
                  isSub,
                  isMaster,
                  subItems,
                }) => (
                  <React.Fragment key={label}>
                    {isMaster ? (
                      //- Conditonal to Handle isMaster Side Items (new-accordion w/ subItems)
                      <>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value={label}>
                            <AccordionTrigger>
                              <SidebarItem
                                label={label}
                                icon={icon}
                                onClick={onClick}
                                href={href}
                                isMain={isMain}
                                isSub={isSub}
                                isMaster={isMaster}
                              />
                            </AccordionTrigger>
                            <AccordionContent>
                              {/* //- Map over subItems of isMaster items */}
                              {subItems?.map((subItem) => (
                                <SidebarItem
                                  key={subItem.label}
                                  label={subItem.label}
                                  icon={subItem.icon}
                                  customIcon={subItem.customIcon}
                                  href={subItem.href}
                                  onClick={subItem.onClick}
                                  isSub={subItem.isSub}
                                />
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </>
                    ) : (
                      //- Handle non-isMaster items
                      <>
                        <SidebarItem
                          label={label}
                          icon={icon}
                          onClick={onClick}
                          href={href}
                          isMain={isMain}
                          isSub={isSub}
                          isMaster={isMaster}
                        />
                      </>
                    )}
                  </React.Fragment>
                )
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* SOCIAL MEDIAS */}
      <div className="flex-1 flex items-end p-4 mr-5 pt-5">
        <div className="flex flex-col w-full items-center justify-center text-primary/80">
          <h1 className="text-center text-sm pb-3 font-light italic">
            Connect with me
          </h1>
          <div className="flex flex-row gap-5 text-primary/70">
            <Link
              target="_blank"
              href="https://devongifford.vercel.app/"
              className="transition ease-in-out duration-150 hover:scale-110"
            >
              <UserSquare size={18} />
            </Link>

            <Link
              target="_blank"
              href="https://www.linkedin.com/in/dbgifford/"
              className="transition ease-in-out duration-150 hover:scale-110"
            >
              <Linkedin size={18} />
            </Link>

            <Link
              target="_blank"
              href="https://github.com/DevonGifford"
              className="transition ease-in-out duration-150 hover:scale-110"
            >
              <Github size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
