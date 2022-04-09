import React, {useState} from 'react';
import "../styles/Home.css";
import { NavBar} from "../NavBar";
import {JobResultCard} from "../JobResultCard";
import {JobGrid} from "../JobGrid";
import {useMutation} from "@apollo/client";
import {GET_JOBS_BY_TYPE} from "../../queries/mutations";
import {JobSearchBar} from "../JobSearchBar";



export function Home() {
    const [searchedTerm, setSearchedTerm] = useState('');
    /*const [searchError, setSearchError] = useState('');

    const [getJobsByType, {loading}] = useMutation(
        GET_JOBS_BY_TYPE,{
            onCompleted: async (data) => {
                console.log(data);
                setSearchError('');
                return data;
            },
            onError: (error) => {
                console.log(error);
            }
        }

    );*/



    const TopSearchBanner = () => {
        function fetchJobs() {
            //getJobsByType({variables: {type: searchedTerm}});

        }

        function getJobTypeList() {
            return undefined; //ver como pedir todos los jobs
        }

        //const jobTypeList = getJobTypeList();
        const jobTypeList = ['Full Time', 'Part Time', 'Freelance', 'Internship'];

        return(
            <div className="container">

                <h1 className="ml-3 mt-3">What are you looking for?</h1>

                <div className="row">
                    <div className="col-9">
                    <div className="input-group mb-3 col-6">
                        <JobSearchBar/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={fetchJobs()}>Search
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

    const obj = {
        imgSrc: "https://www.plumbingbyjake.com/wp-content/uploads/2015/11/VIGILANT-plumber-fixing-a-sink-shutterstock_132523334-e1448389230378.jpg",
        jobTitle: "Home plumber",
        jobType: "Plumber",
        workersName: "Juan Ramon",
        rating: "4.3",
        timeDistance: "30 min",
    };

    const list = []
    for (let i = 0; i < 5; i++) {
        list.push({
            imgSrc: "https://www.plumbingbyjake.com/wp-content/uploads/2015/11/VIGILANT-plumber-fixing-a-sink-shutterstock_132523334-e1448389230378.jpg",
            jobTitle: "Home plumber",
            jobType: "Plumber",
            workersName: "Juan Ramon",
            rating: "4.3",
            timeDistance: "30 min",
        });
    }




    return (
        <div>

            <NavBar firstName="Luis" />
            <TopSearchBanner />



            <div className="container mt-3">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {list.map((item) => (
                        <div className="col>">
                            <JobResultCard
                                imgSrc={item.imgSrc}
                                jobTitle={item.jobTitle}
                                jobType={item.jobType}
                                workersName={item.workersName}
                                rating={item.rating}
                                timeDistance={item.timeDistance}/>

                        </div>)
                    )}


                </div>
            </div>


        </div>
    );
}