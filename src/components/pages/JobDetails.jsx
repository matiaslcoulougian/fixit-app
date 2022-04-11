import React from 'react';
import {NavBar} from "../NavBar";


// Display de los datos del job
export const JobDetails = ({ job }) => {
  return (
      <div>
      <NavBar/>
      <div className="container bg-light">
          <h1 className="mt-3">Job Details</h1>
          <div className="card mt-3">
              <div className="card-body">
                  <div className="row">

                  </div>

                  <div className="row">
                      <div className="col-md-7">
                          <h2>Hackerman Work for Free</h2>
                          <img src={"https://i.ytimg.com/vi/KEkrWRHCDQU/maxresdefault.jpg"} className="img-fluid col-10 mt-2" alt=""/>
                      </div>

                      <div className="col-md-5 mt-4">
                          <div className="row justify-content-center mb-3">
                              <div className=""><h2 className="text-center"><span className="badge bg-info">[Job Type]</span></h2></div>
                          </div>
                          <div className="row justify-content-center">
                              <h4 className="text-center">[Workers name]</h4>

                              <h5 className="text-center">[Rating]</h5>
                              <div className="btn btn-lg btn-primary mt-4 w-75">Ask for Budget</div>
                          </div>
                      </div>


                  </div>

                  <div className="row mt-5">
                      <hr className="w-75 mx-auto"/>
                      <h3>Job Description</h3>

                      <div className="col-md-10">
                          [Job Description]
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </div>

                  </div>
              </div>




          </div>



      </div>
          </div>






  );
};