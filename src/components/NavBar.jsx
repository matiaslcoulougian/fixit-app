import Logo from "./logo.png";
import React from "react";
import {useNavigate} from "react-router-dom";

export const NavBar = (props) => {
    const logoWidthHeight = "50";
    const lineHeight = {
        lineHeight: "50px",
        paddingLeft: "10px",
        fontSize: "35px",
        fontFamily: "work sans",
        color: "black",
        fontWeight: "bold",
    };

    const navigate = useNavigate();

    async function logout() {
        window.localStorage.clear();
        navigate(-1)
    }

    return (
        <div className="navbar navbar-expand-md navbar-light bg-warning px-3">
            <a className="navbar-brand" >
                <span><img src={Logo} alt="logo" width={logoWidthHeight} height={logoWidthHeight} className="d-inline-block align-top"/></span>
                <span style={lineHeight}>Fixit</span>
            </a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>

            </button>

            <div className="collapse navbar-collapse justify-content-end align-end" id="main-nav">
                <ul className="navbar-nav">
                    <li className="nav-item pe-2">
                        <a className="nav-link" href="/">Notifications</a>
                    </li>


                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            Hello, {props.firstName}
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            {!props.isWorker && <li><a className="dropdown-item" href="/hired">Hired Services</a></li>}
                            {props.isWorker && <li><a className="dropdown-item" onClick={() => props.setOpenProfileModal(true)}>Profile Picture</a></li>}
                            <li><a className="dropdown-item">Settings</a></li>
                        </ul>
                    </li>

                    <li className="nav-item ms-2 d-md-inline">
                        <a className="btn btn-secondary" onClick={logout}>Log out</a>
                    </li>
                </ul>
            </div>


        </div>
    )
}