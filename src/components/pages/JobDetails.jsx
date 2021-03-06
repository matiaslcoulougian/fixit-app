import React, {useEffect, useRef, useState} from 'react';
import {NavBar} from "../NavBar";
import {useParams} from "react-router-dom";
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_POST_BY_ID, GET_RATING_AVERAGE, GET_USER_TIME} from "../../queries/queries";
import {round} from "@popperjs/core/lib/utils/math";
import BackButton from "../BackButton";
import {JobSearchBar} from "../JobSearchBar";
import {REQUEST_BUDGET} from "../../queries/mutations";
import {Modal} from "@mui/material";
import LoaderSpinner from "../LoaderSpinner";
import profile from './no-profile.png'
import {BudgetNotification} from "../BudgetNotification";

const S3 = require('aws-sdk/clients/s3');

const config = {bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
};

const s3 = new S3(config);

export const JobDetails = (props) => {
    const id = useParams();
    const [job, setJob] = React.useState(null);
    const [distanceMin, setDistanceMin] = React.useState(5);
    const [distanceHs, setDistanceHs] = React.useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [rating, setRating] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [timeCalculated, setTimeCalculated] = useState(false)
    const [files, setFiles] = useState([])
    const [showSpinner, setShowSpinner] = useState(true)
    const userId = window.localStorage.getItem('userId');

    console.log(window.localStorage.getItem("workerId"))
    const [getJobById, {loading}] = useLazyQuery(
        GET_POST_BY_ID, {
        variables: {
            id: id.jobId
        },
        onCompleted: (data) => {
            console.log("data", data);
            let jobData = {...data.getPostById};
            jobData.type = jobData.type.replace("_", " ");
            setJob(jobData);
            console.log("this job", job);
            console.log("the worker id is", data.getPostById.worker.id)
            console.log("the type of the worker id is", typeof data.getPostById.worker.id);
            getWorkerAvgRating({variables:{input: {workerId: data.getPostById.worker.id}}})
            getUserDistance({variables:{input: {workerId: data.getPostById.worker.id}}})
        },
        onError: (error) => {
            console.log(error);
        }

    });

    const [requestBudget] = useMutation(
        REQUEST_BUDGET, {
            onCompleted: (res) => {
                console.log(res);
                console.log("WORKED!!!")
            },
            onError: (err) => {
                console.log(err);
            }
        }
    );

    const [getWorkerAvgRating] = useLazyQuery(
        GET_RATING_AVERAGE, {
            onCompleted: (data) => {
                console.log("FETCHED!, it is", data.getWorkerAvgRating.average);
                setRating(data.getWorkerAvgRating.average)
            },
            onError: (err) => {
                console.log(err)
            }
        }
    );

    useEffect(() => {
        getJobById()
        // loaderHandler()
    },[]);

    // const loaderHandler = () => {
    //     setLoading(true)
    //     setTimeout(() => {
    //         setLoading(false)
    //         setShowSpinner(false);
    //     }, 1000)
    //
    // };


    const simplifyTime = () => {

        if (job.time > 60) {
            const toHs = job.time/60;
            const roundHs = Math.round(toHs);
            setDistanceHs(roundHs);
            const minutes = (toHs - roundHs) * 60;
            if (minutes > 0) setDistanceMin(minutes)
        }
        setDistanceMin(job.time);
        setTimeCalculated(true);
        console.log("time calculated true")
        //showTime();
    }


    const [getUserDistance] = useLazyQuery(
        GET_USER_TIME, {
            // variables: {
            //     workerId: job.worker.id //poner aca el worker id, no esta en el localstorage, esta en el job.
            // },
            onCompleted: (data) => {
                console.log("get user distance data", data);
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

    const ShowTime = (props) => {
        //h5 className="text-center"
        console.log("en showtime", props)


        if (props.hs && props.min) {
            return(<div>
                <div className="col-md-10">
                    {props.hs} hours and {props.min} minutes away!
                </div>
            </div>)
        }
        if(props.min){
            return(<div>
                <div className="col-md-10">
                    {props.min} minutes away!
                </div>
            </div>)
        }
        else if (props.hs){
            return(<div>
                <div className="col-md-10">
                    {props.hs} hours away!
                </div>
            </div>)
        }
        return (<div>No entro</div>);
    }
    const navBarName = window.localStorage.getItem('firstName');
    const [requestDescription, setRequestDescription] = useState();

    const getDescription = (e) => {
        setRequestDescription(e.target.value)
    }

    console.log("product details id: ", id);

    const handleFileEvent = (e) => {
        const files = Array.prototype.slice.call(e.target.files)
        setFiles(files);
        console.log(files)
    }

    const handleSendBudget = () => {
        const fileNames = [];
        for(const file of files){
            const fileName = `${userId}/${job.id}/${file.name}`
            s3.upload({Bucket: process.env.REACT_APP_BUCKET_NAME, Key: fileName, Body: file}, function(err, data) {
                console.log(err, data);
            });
            fileNames.push(fileName);
        }
        let mutationInput = {
            jobId: id.jobId,
            description: requestDescription,
            imageKeys: fileNames
        }
        console.log("the id is ", id)
        requestBudget({variables:{input:mutationInput}})
        setOpenModal(false);
        setOpenSnackbar(true);
    }

    return (
        <div>
            <BudgetNotification openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} notificationMessage={'Request sent to worker successfully'}/>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title" id="modal-title">Request a Budget</h5>
                            <button type="button" className="btn-close" onClick={()=> setOpenModal(false)} aria-label="Close"/>
                        </div>

                        <div className="modal-body border-0 py-0">
                            <hr/>
                            <div className="container">

                                <div className="mt-3">
                                    <label className="form-label" htmlFor="job-description">Description of the Job (*)</label>
                                    <textarea className="form-control" id="job-description" onChange={getDescription} rows="3" placeholder="Describe your Job as detailed as possible..."/>
                                </div>
                                <br/>
                                <div>
                                    <label className="form-label"> Upload Images </label>
                                    <br/>
                                    <input type="file"
                                           multiple
                                           accept='image/png, image/*'
                                           onChange={handleFileEvent}
                                    />
                                </div>

                            </div>
                            <hr/>
                        </div>
                        <div className="modal-footer border-0 pt-0">
                            <button type="button" className="btn btn-primary" disabled={!requestDescription} onClick={handleSendBudget}>Send Request</button>
                        </div>
                    </div>
                </div>
            </Modal>
          <NavBar firstName={navBarName}/>
            <BackButton marginTop={"mt-2"}  marginLeft={"ms-3"}/>
          <div className="container bg-light">
              <h1 className="mt-1">Job Details</h1>
              <div className="card mt-3">
                  <div className="card-body">
                      <div className="row">
                      </div>
                      <div className="row">
                          <div className="col-md-6">
                              <div className="row justify-content-center mb-1">
                                  <h2>{job?.title || loading}</h2>
                              </div>
                              <div className="row justify-content-center mb-5">
                                {loading && <LoaderSpinner style={"col-10 mt-5 ml-5 row-5"}/>}
                                {!loading && <img src={job?.worker.profileUrl? job?.worker.profileUrl : profile} className="img-thumbnail col-10 mt-2 ml-5 w-50" alt=""/>}
                              </div>
                          </div>
                          <div className="col-md-5 mt-4">
                              <div className="row justify-content-center mb-3 mt-5">
                                  <div className=""><h2 className="text-center"><span className="badge bg-info">{job ? capitalize(job.type.replace("_", " ")) : loading}</span></h2></div>
                              </div>
                              <div className="row justify-content-center mb-5">
                                  <h4 className="text-center">{job?.worker.firstName+" "+job?.worker.lastName || loading}</h4>

                                  <h5 className="text-center">{rating>=0 ? (<span>{rating}<i className="bi bi-star-fill "></i></span>) : <LoaderSpinner/>}</h5>
                                  {timeCalculated && <ShowTime min={distanceMin} hs={distanceHs}/>}
                                  {/* <h6 className="text-center">{simplifyTime}</h6> */}
                                  <button className="btn btn-lg btn-primary mt-4 w-75" onClick={ () => setOpenModal(true)} disabled={localStorage.getItem("userRole") === "worker"}>Ask for Budget</button>
                              </div>
                          </div>
                      </div>
                      <div className="row mt-2">
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