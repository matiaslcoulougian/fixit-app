import React from "react";
import {Route, Redirect, useNavigate} from "react-router-dom";
import auth from "./Auth";

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const navigate = useNavigate();
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    navigate("/login");
                }
            }}
        />
    );
};


