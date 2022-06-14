import React, {useEffect} from 'react';
import {NavBar} from "../NavBar";
import {useParams} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import {GET_POST_BY_ID, GET_USER_TIME} from "../../queries/queries";
import {round} from "@popperjs/core/lib/utils/math";
import BackButton from "../BackButton";

// Display de los datos del job clickeado
export const JobDetails = () => {
    const id = useParams();
    const loading = "Loading...";
    const [job, setJob] = React.useState(null);
    const [distanceMin, setDistanceMin] = React.useState(null);
    const [distanceHs, setDistanceHs] = React.useState(null);
    const [time, setTime] = React.useState(null);
    console.log(window.localStorage.getItem("workerId"))
    const [getJobById] = useLazyQuery(
        GET_POST_BY_ID, {
        variables: {
            id: id.jobId
        },
        onCompleted: (data) => {
            console.log("data", data);
            setJob(data.getPostById);
            console.log("job", job);
        },
        onError: (error) => {
            console.log(error);
        }

    });

    const getJob = () => {
        getJobById();
    };

    useEffect(() => {
        getJob()
    }, []);

    const simplifyTime = () => {

        if (job.time > 60) {
            const toHs = job.time/60;
            const roundHs = Math.round(toHs);
            setDistanceHs(roundHs);
            const minutes = (toHs - roundHs) * 60;
            if (minutes > 0) setDistanceMin(minutes)
        }
        setDistanceMin(job.time);
        showTime();
    }


    const [getUserDistance] = useLazyQuery(
        GET_USER_TIME, {
            variables: {
                workerId: window.localStorage.getItem("workerId")
            },
            onCompleted: (data) => {
                console.log("data", data);
                simplifyTime();
            },
            onError: (error) => {
                console.log(error);
                setDistanceMin('Distance unavailable :(')
            }
        }
    )
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getDistance = () => {
         getUserDistance();
    }

    const showTime = () => {
        if (distanceHs && distanceMin) {
            return(<div>
                <div className="col-md-10">
                    {distanceHs} hours and {distanceMin} minutes away!
                </div>
            </div>)
        }
        if(distanceMin){
            return(<div>
                <div className="col-md-10">
                    {distanceMin} minutes away!
                </div>
            </div>)
        }
        else if (distanceHs){
            return(<div>
                <div className="col-md-10">
                    {distanceHs} hours away!
                </div>
            </div>)
        }
    }
    const navBarName = window.localStorage.getItem('firstName');

    console.log("product details id: ", id);
      return (
          <div>
          <NavBar firstName={navBarName}/>
          <div className="container bg-light">
              <BackButton/>
              <h1 className="mt-1">Job Details</h1>
              <div className="card mt-3">
                  <div className="card-body">
                      <div className="row">
                      </div>
                      <div className="row">
                          <div className="col-md-7">
                              <h2>{job?.title || loading}</h2>
                              <img src={"https://i.ytimg.com/vi/KEkrWRHCDQU/maxresdefault.jpg"} className="img-fluid col-10 mt-2" alt=""/>
                          </div>
                          <div className="col-md-5 mt-4">
                              <div className="row justify-content-center mb-3">
                                  <div className=""><h2 className="text-center"><span className="badge bg-info">{job ? capitalize(job.type) : loading}</span></h2></div>
                              </div>
                              <div className="row justify-content-center">
                                  <h4 className="text-center">{job?.worker.firstName+" "+job?.worker.lastName || loading}</h4>
                                  <h5 className="text-center">[Rating]</h5>
                                  <h6 className="text-center">{simplifyTime}</h6>
                                  <button className="btn btn-lg btn-primary mt-4 w-75" disabled={localStorage.getItem("userRole") === "worker"}>Ask for Budget</button>
                              </div>
                          </div>
                      </div>
                      <div className="row mt-5">
                          <hr className="w-75 mx-auto"/>
                          <h3>Job Description</h3>
                          <div className="col-md-10">
                              {job?.description || loading}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
              </div>
  );
};