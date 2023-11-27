import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useReducer,
  useEffect,
} from "react";
import toast from "react-hot-toast";

export type ToggleAction =
  | { type: "TOGGLE_GENERAL_NOTIFICATIONS" }
  | { type: "TOGGLE_HIDE_CORRECT_ANSWER" }
  | { type: "TOGGLE_LOG_EVENTS" }
  | { type: "TOGGLE_STAR_MENTOR" };

interface CombinedSettingsState {
  generalNotifications: boolean;
  hideCorrectAnswer: boolean;
  logEvents: boolean;
  starMentor: boolean;
}

const initialState: CombinedSettingsState = {
  generalNotifications: true,
  hideCorrectAnswer: false,
  logEvents: false,
  starMentor: false,
};

const toggleReducer = (
  state: CombinedSettingsState,
  action: ToggleAction
): CombinedSettingsState => {
  switch (action.type) {
    case "TOGGLE_GENERAL_NOTIFICATIONS":
      return { ...state, generalNotifications: !state.generalNotifications };
    case "TOGGLE_HIDE_CORRECT_ANSWER":
      return { ...state, hideCorrectAnswer: !state.hideCorrectAnswer };
    case "TOGGLE_LOG_EVENTS":
      return { ...state, logEvents: !state.logEvents };
    case "TOGGLE_STAR_MENTOR":
      return { ...state, starMentor: !state.starMentor };
    default:
      return state; //- if action doesnt match - reducer will return current state (wont break app)
  }
};

export const SettingsReducerContext = createContext<{
  state: CombinedSettingsState;
  dispatch: Dispatch<ToggleAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// 👇 Custom hook to simplify working w/ the SettingsReducerContext
export function useSettingsReducerContext() {
  const context = useContext(SettingsReducerContext);
  if (!context) {
    throw new Error(
      "❌Settings Reducer;  useSettingsReducerContext must be used within SettingsReducerContext"
    );
  }
  return context;
}

type SettingsReducerProviderProps = {
  children: React.ReactNode;
};

export const SettingsReducerProvider: React.FC<SettingsReducerProviderProps> = ({
  children,
}) => {
  // 👇 Load settings from local storage on app load
  const savedSettings = localStorage.getItem("ztmready-setings");
  const initialSettings = savedSettings
    ? JSON.parse(savedSettings)
    : initialState;

  const [state, dispatch] = useReducer(toggleReducer, initialSettings);

  // 👇 Update local storage whenever settings change
  useEffect(() => {
    try {
      localStorage.setItem("ztmready-setings", JSON.stringify(state));
    } catch (error) {
      //- error handling for cases where the local storage is full or not available.
      // 🎯 to-do-list:  Better handle the error here (req: logger)
      toast.error("Failed to save state to local storage:");
      console.log("Failed to save state to local storage:", error);
    }
  }, [state]);

  return (
    <SettingsReducerContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsReducerContext.Provider>
  );
};
