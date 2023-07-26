import React from "react";
import AdminRoutes from "./routes/AdminRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import UserRoutes from "./routes/UserRoutes";
// import Parent from "./pages/memo/Parent";


const App = () => {

// return <Parent/>

  return   <>
  <AdminRoutes/>
   <PublicRoutes/>
   <UserRoutes/>   
  </>
}

export default App