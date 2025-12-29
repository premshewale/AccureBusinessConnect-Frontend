import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/router.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerProvider from "./contexts/CustomerContext.jsx";
import TicketProvider from "./contexts/TicketContext.jsx";


function App() {
  return (
    <>
    
    <CustomerProvider>
      <TicketProvider>
        <RouterProvider router={router} />
      </TicketProvider>
    </CustomerProvider>
   
   
     
      <ToastContainer />
     
    </>
  );
}

export default App;
