// Toast.jsx
import { toast } from "react-toastify";

export const Toast = (message, type, navigator = null) => {
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    onClose: () => {
      if (navigator) {
        navigator();
      }
    },
  };

  switch (type) {
    case "error":
      toast.error(message, toastOptions);
      break;
    case "warn":
      toast.warn(message, toastOptions);
      break;
    case "success":
      toast.success(message, toastOptions);
      break;
    case "info":
      toast.info(message, toastOptions);
      break;
    default:
      toast.info(message, toastOptions);
  }
};

export default Toast;
