import { createContext, Dispatch, useContext } from "react";

type ModalType = "LOGOUT" | "SEARCH" | "SETTINGS";

type ModalState = {
  type: ModalType;
  open: boolean;
};

type ModalContextProps = {
  modal: ModalState;
  dispatch: Dispatch<any>;
};

export const initialState: ModalState = {
  type: "LOGOUT",
  open: false,
};

export function modalReducer(state: ModalState, action: any): ModalState {
  switch (action.type) {
    case "OPEN_MODAL":
      return { type: action.modalType, open: true };
    case "CLOSE_MODAL":
      return { ...state, open: false };
    default:
      throw new Error();
  }
}

export const ModalContext = createContext<ModalContextProps>({
  modal: initialState,
  dispatch: () => null,
});

export function useModalContext() {
  const context = useContext(ModalContext);
  return context;
}
