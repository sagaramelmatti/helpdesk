import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toaster = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      pauseOnFocusLoss={false}
      theme="colored"
    />
  );
};

export default Toaster;
