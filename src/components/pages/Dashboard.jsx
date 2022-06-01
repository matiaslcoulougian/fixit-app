import React, {useEffect, useRef} from 'react';
import {JobSearchBar} from "../JobSearchBar";
import {CREATE_JOB_POST} from "../../queries/mutations";
import {useMutation} from "@apollo/client";
import "../styles/Dashboard.css";
import {useNavigate} from "react-router-dom";
import {NavBar} from "../NavBar";
import JobListCard from "./dashboardCards/JobListCard";
import {handleLog, Redirect} from "../../Redirect";

export const Dashboard = () => {
    const navigate = useNavigate()
    async function logout(){
        window.localStorage.clear();
        navigate(-1);
    }
    const NewJobModal = () => {

        const [title, setTitle] = React.useState('');
        const [description, setDescription] = React.useState('');
        const [type, setType] = React.useState('');
        const [jobCreationSuccessful, setJobCreationSuccessful] = React.useState(false);

        const searchBarRef = useRef();


        const getTitle = (e) => {
            setTitle(e.target.value);
        };

        const getDescription = (e) => {
            setDescription(e.target.value);

        };


        const [createJobPost] = useMutation(
            CREATE_JOB_POST, {
                onCompleted: data => {
                    console.log(data);
                    console.log("JOB CREATED!!!")
                    setJobCreationSuccessful(true)
                },
                onError: error => {
                    console.log(error);
                }
            }

        );
        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        const restoreJobSuccess = () => setJobCreationSuccessful(false);

        const handleAddJob = () => {
            const searchedType = searchBarRef.current.getText();
            console.log(searchedType);
            console.log(title);
            console.log(description);

            createJobPost({
                variables:{
                    title: capitalize(title),
                    description: capitalize(description),
                    type: searchedType.toLowerCase()
                }
            });
        };

        return(
            <div>
                <Redirect />
                <div className="modal fade" id="new-job-modal" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title" id="modal-title">Create New Job</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>

                            </div>

                            <div className="modal-body border-0 py-0">
                                <hr/>
                                <div className="container">
                                    <label htmlFor="job-type" className="form-label">Select Job type</label>
                                    <JobSearchBar ref={searchBarRef}/>

                                    <div className="mt-3">
                                        <label className="form-label" htmlFor="job-title">Job Title</label>
                                        <input className="form-control" id="job-title" rows="3" onChange={getTitle} placeholder="Write a Title for your Job..."/>
                                    </div>


                                    <div className="mt-3">
                                        <label className="form-label" htmlFor="job-description">Description of the Job</label>
                                        <textarea className="form-control" id="job-description" onChange={getDescription} rows="3" placeholder="Describe your Job as detailed as possible..."/>
                                    </div>

                                    {jobCreationSuccessful && <div className="alert alert-success mt-2" role="alert">
                                        Job Created Successfully! Please close this window.
                                    </div>}

                                </div>
                                <hr/>
                            </div>

                            <div className="modal-footer border-0 pt-0">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={restoreJobSuccess}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleAddJob}>Add Job</button>
                            </div>



                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn btn-lg btn-primary text-center" data-bs-toggle="modal" data-bs-target="#new-job-modal"> Create New Job</button>
                </div>

                <div className="container">
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <JobListCard/>
                        </div>


                        <div className="col-md-6">
                            <div className="card">
                                <h3 className="card-header">Money Made</h3>
                                <div className="card-body">
                                    <h3 className="card-title text-center">$22.155,53</h3>
                                    <p className="card-text">[Card with earnings list, eg Job x +$150]</p>
                                    <a href="#" className="btn btn-primary">See full list</a>
                                </div>
                            </div>
                        </div>

                </div>

                    <div className="row mt-3">
                        <div className="col-md-6">
                            <div className="card">
                                <h3 className="card-header">My Rating</h3>
                                <div className="card-body">
                                    <h3 className="card-title text-center">4.7 <i className="bi bi-star-fill "></i></h3>
                                    <p className="card-text text-center">42 jobs done</p>
                                    <a href="#" className="btn btn-primary">See jobs done</a>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="card">
                                <h3 className="card-header">Comments</h3>
                                <div className="card-body">
                                    <h3 className="card-title text-center">[List of Comments]</h3>

                                    <a href="#" className="btn btn-primary">See full list</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>);
    }



  return (
      <div>
        <NavBar isWorker={true} firstName={window.localStorage.getItem("firstName")}/>
        <div className="container mt-3">
            <h1>Your Dashboard</h1>
            <NewJobModal/>


        </div>
        </div>
  );


};