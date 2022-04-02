import React from 'react';
import "./styles/Home.css";
import Logo from "./logo.png";


export function Home() {
    const logoWidthHeight = "50";
    const lineHeight = {
        lineHeight: "50px",
        paddingLeft: "10px",
        fontSize: "35px",
        fontFamily: "work sans",
        color: "black",
        fontWeight: "bold",
    };



    const NavBar = (props) => {
        return (
            <div className="navbar navbar-expand-md navbar-light bg-warning">
                <a href="/" className="navbar-brand" >
                    <span><img src={Logo} alt="logo" width={logoWidthHeight} height={logoWidthHeight} className="d-inline-block align-top"/></span>
                    <span style={lineHeight}>Fixit</span>
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>

                </button>

                <div className="collapse navbar-collapse justify-content-end align-end" id="main-nav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Notifications</a>
                        </li>


                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Hello, {props.firstName}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a className="dropdown-item" href="#">Hired Services</a></li>
                                <li><a className="dropdown-item" href="#">My Profile</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                            </ul>
                        </li>



                        <li className="nav-item ms-2 d-md-inline">
                            <a className="btn btn-secondary" href="/">Log out</a>
                        </li>
                    </ul>

                </div>



            </div>
        )
    }

    const TopSearchBanner = () => {
        return(
            <div className="container">

                <h1 className="ml-3 mt-3">What are you looking for?</h1>

                <form className="form-inline">
                    <div className="input-group mb-3 col-9">
                        <input type="text" className="form-control" placeholder="Search for a job..."
                               aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search
                            </button>
                        </div>
                    </div>

                    <div className="dropdown mb-3">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort by
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>

                </form>
            </div>
        );
    }

    return (
        <div>

            <NavBar firstName="Luis" />
            <TopSearchBanner />

            <div className="row my-5 align-items-center justify-content-center">
                <div className="col-8 col-lg-4 col-xl-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Luis</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>

            </div>



        </div>
    );
}