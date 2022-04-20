import React, {useEffect, useRef, useState} from 'react';
import "../styles/Home.css";
import { NavBar} from "../NavBar";
import {JobGrid} from "../JobGrid";
import {useLazyQuery} from "@apollo/client";
import {GET_POSTS_BY_TYPE} from "../../queries/queries";
import {JobSearchBar} from "../JobSearchBar";

export const Home = () => {
    const searchBarRef = useRef();
    const [search, setSearch] = useState("");
    const firstName = window.localStorage.getItem('firstName');
    let searchedType = "";
    const [realList, setRealList] = useState(
        () =>{
        if (window.localStorage.getItem("realList") !== null) {
            return JSON.parse(window.localStorage.getItem("realList"));
        }
        else {
            return [{
                imgSrc: "https://www.plumbingbyjake.com/wp-content/uploads/2015/11/VIGILANT-plumber-fixing-a-sink-shutterstock_132523334-e1448389230378.jpg",
                title: "Home plumber",
                type: "Plumber",
                worker: {
                    firstName: "juano",
                    lastName: "ramon"
                }
            }];
        }
        }
    );
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
                window.localStorage.setItem("realList", JSON.stringify(list));
                return data;
            },
            onError: (error) => {
                console.log(error);
            }
        }
    );
    function sortJobsByProperty(e){
        let sortedList;
        const property = e.currentTarget.getAttribute("field");
        console.log("entered!");
        console.log("property chosen", property);
        let list = [...realList];
        switch(property){
            case "type":
                sortedList = list.sort((a,b) => {
                    console.log("a", a.type);
                    console.log("a", a);
                    if(a.type < b.type) return -1;
                    if(a.type > b.type) return 1;
                    return 0;
                });
                break;
            case "title":
                sortedList = list.sort((a,b) => {
                    if(a.title < b.title) return -1;
                    if(a.title > b.title) return 1;
                    return 0;
                });
                break;

            case "worker":
                sortedList = list.sort((a,b) => {
                    if((a.worker.firstName + a.worker.lastName) < (b.worker.firstName + b.worker.lastName)) return -1;
                    if((a.worker.firstName + a.worker.lastName) > (b.worker.firstName + b.worker.lastName)) return 1;
                    return 0;
                });
                break;
            default:
                sortedList = realList;
        }
        setRealList(sortedList);
    }
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
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2"
                                data-bs-toggle="dropdown" aria-expanded="false">
                            Sort By
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <li>
                                <button className="dropdown-item" type="button" onClick={sortJobsByProperty} field={"type"}>Type</button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button" onClick={sortJobsByProperty} field={"title"}>Title</button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button" onClick={sortJobsByProperty} field={"worker"}>Worker</button>
                            </li>
                        </ul>
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