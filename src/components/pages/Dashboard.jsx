import React from 'react';
import {JobSearchBar} from "../JobSearchBar";

export const Dashboard = () => {
    const NewJobModal = () => {
        return(
            <div>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#new-job-modal"> Create New Job</button>

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
                                    <JobSearchBar/>

                                    <div className="mt-3">
                                        <label className="form-label" htmlFor="job-description">Description of the Job</label>
                                        <textarea className="form-control" id="job-description" rows="3" placeholder="Describe your Job as detailed as possible..."/>
                                    </div>

                                </div>
                                <hr/>
                            </div>

                            <div className="modal-footer border-0 pt-0">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Add Job</button>
                            </div>



                        </div>
                    </div>
                </div>
            </div>);
    }



  return (
    <div className="container">
        <h1>Worker's Dashboard</h1>
        <NewJobModal/>


    </div>
  );


};