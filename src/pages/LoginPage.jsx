import {LoginForm} from "../components/pages/LoginForm";
import ScrollToTop from "../components/ScrollToTop";
import React from "react";

const LoginPage = () => {
    return (
        <div className="big-div">
            <LoginForm />
            <ScrollToTop/>
        </div>
    )
}

export default LoginPage;