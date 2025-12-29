import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import { initializeAuth } from "./slices/auth/loginSlice.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const dispatch = useDispatch();
  const { isInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // ⏳ Wait until auth is restored
  if (!isInitialized) {
    return null; // or splash / loader
  }

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


// import { RouterProvider } from "react-router-dom";
// import "./App.css";
// import router from "./routes/router.jsx";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// function App() {
//   return (
//     <>
//       <RouterProvider router={router} />
//       <ToastContainer />
//     </>
//   );
// }

// export default App;
