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

    const JobResult = (props) => {
        return(
            <div className="container">
                <div className="card mb-3 shadow" style={{width: "400px"}}>
                    <img src={props.imgSrc} className="card-img-top w-50 h-50 rounded mx-auto d-block mt-3"/>
                        <div className="card-body text-center">
                            <h4 className="card-title">{props.jobTitle}</h4>
                            <h5 className="card-title">{props.jobType}</h5>
                            <h6 className="card-title">{props.workersName}</h6>
                            <p className="card-text">{props.rating} <i className="bi bi-star-fill "></i></p>
                            <p className="card-text"><small className="text-muted">{props.timeDistance} away</small></p>
                            <div className="btn btn-primary">Details</div>
                        </div>
                </div>
            </div>
        );

    }


    return (
        <div>

            <NavBar firstName="Luis" />
            <TopSearchBanner />
            <JobResult imgSrc={`${process.env.PUBLIC_URL}/assets/images/dog.jpg`} jobTitle={"Home plumber"} jobType={"Plumber"} workersName={"Juan Ramon"} rating={"4.3"} timeDistance={"30 min"}/>






        </div>
    );
}