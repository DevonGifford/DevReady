"use client";
import { useContext, useEffect, useState } from "react";
import { ModeToggle } from "../ThemeToggle";
import { useModalContext } from "../providers/ModalReducerProvider";
import {
  SettingsReducerContext,
  ToggleAction,
} from "../providers/SettingsReducerProvider";

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

  const { state: toggleState, dispatch: toggleDispatch } = useContext(
    SettingsReducerContext
  );

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
              Enable this to receive general notifications as toast alerts.
            </SettingDescription>
          </SettingTitle>
          <Switch
            checked={toggleState.generalNotifications} // Use the toggle state
            onCheckedChange={
              () =>
                toggleDispatch({
                  type: "TOGGLE_GENERAL_NOTIFICATIONS",
                } as ToggleAction) // Dispatch action to toggle the state
            }
          />
        </SettingSection>

        <SettingSection>
          <SettingTitle>
            <Label>Hide correct answer 🎯</Label>
            <SettingDescription>
              Disable the ability to see correct answers.
            </SettingDescription>
          </SettingTitle>
          <Switch
            checked={toggleState.hideCorrectAnswer} // Use the toggle state
            onCheckedChange={
              () =>
                toggleDispatch({
                  type: "TOGGLE_HIDE_CORRECT_ANSWER",
                } as ToggleAction) // Dispatch action to toggle the state
            }
          />
        </SettingSection>

        <SettingSection>
          <SettingTitle>
            <Label>Log events 🎯</Label>
            <SettingDescription>
              Enable this to see all event logs as toast notifications.
            </SettingDescription>
          </SettingTitle>
          <Switch
            checked={toggleState.logEvents} // Use the toggle state
            onCheckedChange={
              () =>
                toggleDispatch({
                  type: "TOGGLE_LOG_EVENTS",
                } as ToggleAction) // Dispatch action to toggle the state
            }
          />
        </SettingSection>

        <SettingSection>
          <SettingTitle>
            <Label>Star Mentor 🎯</Label>
            <SettingDescription>
              Are you a star mentor? Turn on the admin functionality
            </SettingDescription>
          </SettingTitle>
          <Switch
            checked={toggleState.starMentor} // Use the toggle state
            onCheckedChange={
              () =>
                toggleDispatch({
                  type: "TOGGLE_STAR_MENTOR",
                } as ToggleAction) // Dispatch action to toggle the state
            }
            disabled
            aria-readonly
          />
        </SettingSection>

      </DialogContent>
    </Dialog>
  );
};
