import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface SettingModalProps {
  openSettingModal?: boolean;
  setOpenSettingModal: Dispatch<SetStateAction<boolean>>;
}

export const SettingsModalContext = createContext<SettingModalProps>({
  openSettingModal: false,
  setOpenSettingModal: () => null,
});

// 👇 Custom hook to work with the SettingsModalContext
export function useSettingsModalContext() {
  const SettingsModal = useContext(SettingsModalContext);

  return SettingsModal;
}
