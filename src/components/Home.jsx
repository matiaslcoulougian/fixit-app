import React from 'react';
import "./styles/Home.css";
import { NavBar} from "./NavBar";


export function Home() {

    const imgSrc = (__filename) => {
        return `${process.env.PUBLIC_URL}/assets/images/dog.jpg`;
    }


    const TopSearchBanner = () => {
        return(
            <div className="container">

                <h1 className="ml-3 mt-3">What are you looking for?</h1>

                <div className="row">
                    <div className="col-9">
                    <div className="input-group mb-3 col-6">
                        <input type="text" className="form-control" placeholder="Search for a job..."
                               aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search
                            </button>
                        </div>
                    </div>
                    </div>

                    <div className="dropdown mb-3 col-3">
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

                </div>

            </div>
        );
    }

    const JobResult = () => {
        return(
            <div className="row my-5 align-items-center justify-content-center">
                <div className="col-8 col-lg-4 col-xl-3">
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/dog.jpg`} className="img-fluid rounded-start" alt="dog"/>
                            </div>

                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );


    }


    return (
        <div>

            <NavBar firstName="Luis" />
            <TopSearchBanner />
            <JobResult />






        </div>
    );
}