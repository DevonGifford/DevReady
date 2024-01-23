//🎯 work in progress - still considering if this is the correct approach
import { useSettingsReducerContext } from "@/components/providers/SettingsReducerProvider";
import { toast, ToastOptions } from "react-hot-toast";

export function useCustomToast() {
  const { state } = useSettingsReducerContext();

  const customToast = (message: string, options: ToastOptions = {}) => {
    if (state.generalNotifications) {
      toast(message, options);
    }
  };

  return customToast;
}
