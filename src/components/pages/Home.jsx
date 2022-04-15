import React, {useEffect, useRef, useState} from 'react';
import "../styles/Home.css";
import { NavBar} from "../NavBar";
import {JobResultCard} from "../JobResultCard";
import {JobGrid} from "../JobGrid";
import {setLogVerbosity, useLazyQuery, useQuery} from "@apollo/client";
import {GET_POSTS_BY_TYPE} from "../../queries/queries";
import {JobSearchBar} from "../JobSearchBar";



export const Home = () => {

    const searchBarRef = useRef();
    const [search, setSearch] = useState("");
    const firstName = window.localStorage.getItem('firstName');
    let searchedType = "";
    const [realList, setRealList] = useState([{
        imgSrc: "https://www.plumbingbyjake.com/wp-content/uploads/2015/11/VIGILANT-plumber-fixing-a-sink-shutterstock_132523334-e1448389230378.jpg",
        title: "Home plumber",
        type: "Plumber",
        worker: {
            firstName: "juano",
            lastName: "ramon"
        }

    }]);

    const [getPostsByType] = useLazyQuery(
        GET_POSTS_BY_TYPE,{

            variables: {
                type: search,
            },

            onCompleted: async (data) => {
                console.log(data);
                list = data.getPostsByType;
                console.log("list", list);
                setRealList(list);
                return data;
            },
            onError: (error) => {
                console.log(error);
            }


        }

    );

    useEffect(() => {
        if(searchedType !== ""){
            setSearch(searchedType);
        }
    }, [searchedType]);


    async function fetchJobs() {
        console.log("fetching jobs");
        searchedType = searchBarRef.current.getText();
        console.log(searchedType);
        setSearch(searchedType);
        const response = await getPostsByType();
        console.log("response", response);
        console.log("response.data", response.data.getPostsByType);
        // list = response.data.getPostsByType;
        // console.log("list", list);


        // const {data} = getPostsByType({
        //     variables: {
        //         type: searchedType
        //     }
        // });




    }


    const TopSearchBanner = () => {

        return(
            <div className="container">
                <h1 className="ml-3 mt-3">What are you looking for?</h1>
                <div className="row">
                    <div className="col-9">
                    <div className="input-group mb-3 col-6">
                        <JobSearchBar ref={searchBarRef} style={{width: "880px"}}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={fetchJobs} >Search</button>
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

    let list = []
    for (let i = 0; i < 5; i++) {
        list.push({
            imgSrc: "https://www.plumbingbyjake.com/wp-content/uploads/2015/11/VIGILANT-plumber-fixing-a-sink-shutterstock_132523334-e1448389230378.jpg",
            title: "Home plumber",
            type: "Plumber",
            worker: {
                firstName: "juano",
                lastName: "ramon"
            }

        });
    }




    return (
        <div>

            <NavBar firstName={firstName} />
            <TopSearchBanner />
            <JobGrid list={realList}/>

        </div>
    );
}