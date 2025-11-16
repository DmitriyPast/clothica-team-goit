import { toast, type ToastPosition } from "react-hot-toast";

export enum ToastType {
  success = "success",
  error = "error",
  loading = "loading",
  custom = "custom",
}

interface ToastProps {
  duration: number;
  position: ToastPosition;
}

export default function showToast(toastType: ToastType, text: string) {
  const toastProps: ToastProps = {
    duration: 3000,
    position: "top-right",
  };

  return toast[toastType](text, toastProps);
}