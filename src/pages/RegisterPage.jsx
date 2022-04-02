import {RegisterForm} from "../components/RegisterForm";
import ScrollToTop from "../components/ScrollToTop";
import React from "react";
import "./styles/RegisterPage.css";

const RegisterPage = () => {
    return (
        <div className="big-div">
            <RegisterForm />
            <ScrollToTop/>
        </div>
    )
}

export default RegisterPage;