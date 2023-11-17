"use client";
import { useEffect, useState, useContext } from "react";
import { SettingsModalContext } from "@/components/providers/SettingsboxProvider";
import { ModeToggle } from "../ThemeToggle";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  SettingDescription,
  SettingSection,
  SettingTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const SettingsModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { openSettingModal, setOpenSettingModal } =
    useContext(SettingsModalContext);

  // ✅ listening if should be mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={openSettingModal} onOpenChange={setOpenSettingModal}>
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
