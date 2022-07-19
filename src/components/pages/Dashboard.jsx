import React, {useEffect, useRef, useState} from 'react';
import {JobSearchBar} from "../JobSearchBar";
import {CREATE_JOB_POST} from "../../queries/mutations";
import {useLazyQuery, useMutation} from "@apollo/client";
import "../styles/Dashboard.css";
import {useNavigate} from "react-router-dom";
import {NavBar} from "../NavBar";
import JobListCard from "./dashboardCards/JobListCard";
import {Redirect} from "../../Redirect";
import RatingCard from "./dashboardCards/RatingCard";
import BudgetRequestsCard from "./dashboardCards/BudgetRequestsCard";
import {Modal} from "@mui/material";
import {GET_ME} from "../../queries/queries";
import {BalanceCard} from "./dashboardCards/BalanceCard";
import {BudgetNotification} from "../BudgetNotification";
import {ProfileModal} from "../ProfileModal";

export const Dashboard = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const navigate = useNavigate()
    const [openProfileModal, setOpenProfileModal] = useState(false)
    const [me, setMe] = useState();
    const [refresh, setRefresh] = useState(true)

    async function logout(){
        window.localStorage.clear();
        navigate(-1);
    }

    const [getMe] = useLazyQuery(
        GET_ME, {
            onCompleted:  (res) => {
                console.log(res.getMe)
                console.log('got meeeeeeeeeee')
                setMe(res.getMe);
            },
            onError: (err) => {
                console.log(err);
            }
        }
    );

    useEffect( async () => {
        await getMe();
        setRefresh(false)
    }, [refresh]);

    const NewJobModal = () => {

        const [title, setTitle] = React.useState('');
        const [description, setDescription] = React.useState('');
        const [type, setType] = React.useState('');
        const [jobCreationSuccessful, setJobCreationSuccessful] = React.useState(false);
        const [openModal, setOpenModal] = useState(false);
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

        const restoreJobSuccess = () => {
            setJobCreationSuccessful(false);
            setOpenModal(false)
        }

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
            setJobCreationSuccessful(false);
            setOpenModal(false)
            setNotificationMessage("Job Created Successfully!");
            setOpenSnackbar(true);
        };

        return(
            <div>
                <Redirect />

                <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title" id="modal-title">Create New Job</h5>
                                <button type="button" className="btn-close" onClick={()=>restoreJobSuccess()} aria-label="Close"/>

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
                                <button type="button" className="btn btn-primary" disabled={jobCreationSuccessful} onClick={handleAddJob}>Add Job</button>
                            </div>



                        </div>
                    </div>
                </Modal>
                <div className="text-center">
                    <button className="btn btn-lg btn-primary text-center" onClick={()=> setOpenModal(true)}> Create New Job</button>
                </div>

                <div className="container">
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <JobListCard/>
                        </div>


                        <div className="col-md-6">
                            <BudgetRequestsCard/>
                        </div>

                </div>

                    <div className="row mt-3">
                        <div className="col-md-6" >
                            {me && <RatingCard workerId={me.id}/>}
                        </div>


                        <div className="col-md-6">
                            {me && <BalanceCard me={me}/>}
                        </div>

                    </div>
                </div>

            </div>);
    }



  return (
      <div>
        <NavBar isWorker={true} firstName={window.localStorage.getItem("firstName")} setOpenProfileModal={setOpenProfileModal}/>
        <div className="container mt-3">
            <h1>Your Dashboard</h1>
            <NewJobModal/>
            {me && <ProfileModal openModal={openProfileModal} setOpenModal={setOpenProfileModal} me={me}/>}
            <BudgetNotification openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} notificationMessage={notificationMessage}/>
        </div>
        </div>
  );


};