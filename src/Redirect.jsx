import React from 'react';
import {useNavigate} from "react-router-dom";


export const Redirect = () => {
    const navigate = useNavigate()
    return (
        <div>
            {!localStorage.getItem("token") && navigate("/login")}
        </div>
    );
}