import { toast } from "react-toastify";

export const showSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    className:
      "bg-green-600 text-white font-medium rounded-lg shadow-lg p-4",
  });
};

export const showError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    className:
      "bg-red-600 text-white font-medium rounded-lg shadow-lg p-4",
  });
};

export const showWarning = (message) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 2000,
    className:
      "bg-yellow-500 text-black font-medium rounded-lg shadow-lg p-4",
  });
};

export const showInfo = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 2000,
    className:
      "bg-blue-600 text-white font-medium rounded-lg shadow-lg p-4",
  });
};
