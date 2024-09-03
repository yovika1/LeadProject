import { Navigate, Route, Routes } from "react-router-dom";

import Cookies from "js-cookie";
import { Login } from "../components/Loginpage/Login";
import { SignUp } from "../components/signup/SignUp";
import ForgotUsername from "../page/forgot";
import { LeadsFlow } from "../page/LeadForm";
import {LeadList} from "../page/DisplayLead";

const Auth = () => {
  const isAuthenticated = Cookies.get("token") || false;

  return (
    <Routes>
      
      {isAuthenticated ? (
        <>
          <Route path="/" element={<LeadsFlow/>}/> 
          <Route path="/leadlist" element={<LeadList/>}/>        
        </>
          
      
      ) : (
        <>
          <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot" element={<ForgotUsername />} />
        <Route path="/signup" element={<SignUp/>}/>
        
        </>
      )}
    </Routes>
  );
};

export default Auth;
