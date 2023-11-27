"use client";
import { useEffect, useState } from "react";
import { ModeToggle } from "../ThemeToggle";
import { useModalContext } from "../providers/ModalReducerProvider";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  SettingDescription,
  SettingSection,
  SettingTitle,
} from "@/components/ui/dialog";

export const SettingsModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { modal, dispatch } = useModalContext();

  // ✅ listening if should be mounted
  useEffect(() => {
    if (modal.open && modal.type === "SETTINGS") {
      setIsMounted(true);
    } else {
      setIsMounted(false);
    }
  }, [modal]);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog
      open={modal.open}
      onOpenChange={() => dispatch({ type: "CLOSE_MODAL" })}
    >
      <DialogContent>
        <DialogHeader className="border-b py-3">
          <h2 className="text-lg font-medium">My settings</h2>
        </DialogHeader>

        <SettingSection>
          <SettingTitle>
            <Label>Theme</Label>
            <SettingDescription>
              Customize how ZTM Ready looks on your device
            </SettingDescription>
          </SettingTitle>
          <ModeToggle />
        </SettingSection>

        <SettingSection>
          <SettingTitle>
            <Label>General Notifications 🎯</Label>
            <SettingDescription>
              Do you want to turn on general notifcations?
            </SettingDescription>
          </SettingTitle>
          <Switch
          //checked={}
          //onCheckedChange={}
          //disabled
          //aria-readonly
          />
        </SettingSection>

        <SettingSection>
          <SettingTitle>
            <Label>Hide correct answer 🎯</Label>
            <SettingDescription>
              Disable the ability to check the correct answer until complete.
            </SettingDescription>
          </SettingTitle>
          <Switch
          //checked={}
          //onCheckedChange={}
          //disabled
          //aria-readonly
          />
        </SettingSection>

        <SettingSection>
          <SettingTitle>
            <Label>Log events 🎯</Label>
            <SettingDescription>
              Do you want to see all log notifications
            </SettingDescription>
          </SettingTitle>
          <Switch
          //checked={}
          //onCheckedChange={}
          //disabled
          //aria-readonly
          />
        </SettingSection>

        <SettingSection>
          <SettingTitle>
            <Label>Star Mentor 🎯</Label>
            <SettingDescription>
              Are you a star mentor? Turn on admin functionality
            </SettingDescription>
          </SettingTitle>
          <Switch
            //checked={}
            //onCheckedChange={}
            disabled
            aria-readonly
          />
        </SettingSection>
      </DialogContent>
    </Dialog>
  );
};
