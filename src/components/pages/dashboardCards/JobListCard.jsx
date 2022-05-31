import React, {useEffect, useState} from 'react';
import {useLazyQuery} from "@apollo/client";
import {GET_ME, GET_WORKER_POSTS} from "../../../queries/queries";

const JobListCard = () => {
    const [jobList, setJobList] = useState([]);
    const [me, setMe] = useState();
    const [selectedJobs, setSelectedJobs] = useState([]);
    const jobResultQuantity = 2;

    function filterPosts() {
        let i = 0;
        console.log("ENTERED");
        let tempArray = [];
        console.log(jobList.length)
        while(tempArray.length < jobResultQuantity && i < jobList.length){
            console.log("dentro")
            console.log("current job", jobList[i])
            if(jobList[i].isActive == "true"){
                console.log("entered if")
                tempArray.push(jobList[i]);
            }
            i++;
        }
        console.log("temp array", tempArray)
        setSelectedJobs(tempArray);
    }

    const [getWorkerJobs, {loading: postsLoading}] = useLazyQuery(
        GET_WORKER_POSTS, {

            onCompleted: (res) =>{
                console.log("Get jobs list: ", res.getWorkerPosts);
                console.log("final Me: ", me);
                setJobList(res.getWorkerPosts);


            },
            onError: (err) => {
                console.log(err);
            }
        }
    );

    const [getMe, {loading: loadingMe}] = useLazyQuery(
        GET_ME, {
            onCompleted:  (res) => {
                console.log(res.getMe)
                setMe(res.getMe);
                console.log(res.getMe.id)
                getWorkerJobs({variables:{workerId: res.getMe.id}});
            },
            onError: (err) => {
                console.log(err);
            }
        }
    );

    useEffect(() => {
        getMe();
        filterPosts();
    }, [jobList]);


    return (
        <div>
            <div className="card">
                <h3 className="card-header d-flex justify-content-between align-items-start">My Jobs<span className={"btn"} data-bs-toggle="modal" data-bs-target="#new-job-modal"><i
                    className="bi bi-plus-square"></i></span></h3>
                <div className="card-body">

                    <div className={"list-group mb-2"}>
                        {postsLoading ?
                            (<div className={"d-flex justify-content-center"}><div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span> </div> </div>)
                            :
                            selectedJobs.map((job) => <div className={"list-group-item"}>{job.title}</div>)
                        }
                    </div>

                    <a href="/my-jobs" className="btn btn-primary">See full list</a>
                </div>
            </div>
        </div>
    );
};

export default JobListCard;


