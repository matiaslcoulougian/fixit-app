import React, {useRef} from 'react';
import {JobSearchBar} from "../JobSearchBar";
import {CREATE_JOB_POST} from "../../queries/mutations";
import {useMutation} from "@apollo/client";

export const Dashboard = () => {
    const NewJobModal = () => {

        const [title, setTitle] = React.useState('');
        const [description, setDescription] = React.useState('');
        const [type, setType] = React.useState('');

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
                },
                onError: error => {
                    console.log(error);
                }
            }

        );

        const handleAddJob = () => {
            const searchedType = searchBarRef.current.getText();
            console.log(searchedType);
            console.log(title);
            console.log(description);

            createJobPost({
                variables:{
                    title: title,
                    description: description,
                    type: searchedType
                }
            });
        };



        return(
            <div>
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

                                </div>
                                <hr/>
                            </div>

                            <div className="modal-footer border-0 pt-0">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleAddJob}>Add Job</button>
                            </div>



                        </div>
                    </div>
                </div>


                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#new-job-modal"> Create New Job</button>
            </div>);
    }



  return (
    <div className="container">
        <h1>Worker's Dashboard</h1>
        <NewJobModal/>


    </div>
  );


};