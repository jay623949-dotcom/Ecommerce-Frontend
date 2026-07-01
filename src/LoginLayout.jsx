import React from "react";
import Login from "./auth-components/Login";
import { AuthProvider } from "./context/AuthContext";

function LoginLayout(){
    return(
        <AuthProvider>
        <Login />
        </AuthProvider>
    );
}

export default LoginLayout;