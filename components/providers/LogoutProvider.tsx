import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface LogoutModalProps {
  openLogoutModal?: boolean;
  setOpenLogoutModal: Dispatch<SetStateAction<boolean>>;
}

export const LogoutModalContext = createContext<LogoutModalProps>({
  openLogoutModal: false,
  setOpenLogoutModal: () => null,
});

// 👇 Custom hook to work with the LogoutModalContext
export function useLogoutModalContext() {
  const LogoutModal = useContext(LogoutModalContext);

  return LogoutModal;
}
