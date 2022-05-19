import {React, useEffect} from 'react';
import {NavBar} from "../NavBar";


export const MyJobs = () => {


    useEffect(() => {

    }, []);


  return (
    <div>
        <NavBar firstName={localStorage.getItem('firstName')}/>
        <div className={"container"}>
            <h1>My Jobs</h1>
            <div className={"container"}>
                <h2>Active Jobs</h2>
                <ul className="list-group">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                    <li className="list-group-item">A fourth item</li>
                    <li className="list-group-item">And a fifth one</li>
                </ul>


            </div>



        </div>


    </div>
  );
};