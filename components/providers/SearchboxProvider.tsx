import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface SearchModalProps {
  openSearchModal?: boolean;
  setOpenSearchModal: Dispatch<SetStateAction<boolean>>;
}

export const SearchModalContext = createContext<SearchModalProps>({
  openSearchModal: false,
  setOpenSearchModal: () => null,
});

// 👇 Custom hook to work with the SearchModalContext
export function useSearchModalContext() {
  const searchModal = useContext(SearchModalContext);

  return searchModal;
}
