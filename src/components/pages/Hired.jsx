import React, {useEffect, useState} from 'react';
import {NavBar} from "../NavBar";
import {GET_BUDGET_BY_CUSTOMER} from "../../queries/queries";
import {useLazyQuery} from "@apollo/client";
import BackButton from "../BackButton";
import {Modal} from "@mui/material";

const Hired = (props) => {

    const [respondedBudgets, setRespondedBudgets] = useState();
    const [acceptedBudgets, setAcceptedBudgets] = useState();
    const [completedBudgets, setCompletedBudgets] = useState();


    const [getBudgetByCustomer] = useLazyQuery(
        GET_BUDGET_BY_CUSTOMER, {
            onCompleted: (res) => {
                console.log("GOT BUDGETS!");
                return res;
            },
            onError: (err) => {
                console.log(err);
            }
        }
    );


    useEffect(async () => {
        let responded = await getBudgetByCustomer({variables:{input:{status: "RESPONDED"}}})
        let accepted = await getBudgetByCustomer({variables:{input:{status: "ACCEPTED"}}})
        let completed = await getBudgetByCustomer({variables:{input:{status: "COMPLETED"}}})
        console.log("responded", responded)

        setRespondedBudgets(responded.data.getBudgetByCustomer)
        setAcceptedBudgets(accepted.data.getBudgetByCustomer)
        setCompletedBudgets(completed.data.getBudgetByCustomer)
    }, []);
    
    const [openModal, setOpenModal] = useState(false);
    
    const RespondedBudgetModal = () => {
        
        
        return(
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title" id="modal-title">Confirm Budget</h5>
                            <button type="button" className="btn-close" onClick={() => setOpenModal(false)} data-bs-dismiss="modal" aria-label="Close"/>

                        </div>

                        <div className="modal-body border-0 py-0">
                            <div className={"modal-form"}>
                                <hr/>

                                <div className="container">

                                    <div className="mt-3">
                                        <label className="form-label" htmlFor="job-title">Job</label>
                                        <div className="form-control" id="job-title" rows="3">yeayeayea</div>
                                    </div>


                                    <div className="mt-3">
                                        <label className="form-label" htmlFor="job-description">Description of the Job</label>
                                        <div className="form-control" id="job-description" rows="3">yea</div>
                                    </div>

                                </div>
                                <hr/>


                            {/*updateJobInfo(newTitle, newDescription)}*/}
                            <div className="modal-footer border-0 pt-0">
                                <button type="button" className="btn btn-secondary">Decline</button>
                                <button type="button" className="btn btn-primary">Send</button>
                            </div>



                            </div>
                        </div>
                    </div>
                </div>
            </Modal>);
        
        
    }


    function handleClick(budget) {
        
    }

    return (
        <div>
            
            <NavBar firstName={localStorage.getItem("firstName")}/>
            <BackButton/>

            <div className={"container"}>
                <div className={"row"}>
                    <h2> Budgets to Confirm</h2>
                    <div className={"list-group"}>
                        {respondedBudgets?.length === 0 ? (<h2>No budgets yet...</h2>): (respondedBudgets?.map((budget) => {
                            return(<div role="button" onClick={() => handleClick(budget)} className={"list-group-item"}>
                                <div>{budget.job.title}</div>
                                <div>{budget.job.worker.firstName + " " + budget.job.worker.lastName}</div>

                            </div>)
                        }))}
                    </div>

                </div>

                <div className={"row"}>
                    <h2> Confirmed Budgets</h2>
                    <div className={"list-group"}>
                        {acceptedBudgets?.length === 0 ? (<h2>No budgets yet...</h2>) : (acceptedBudgets?.map((budget) => {
                            return(<div className={"list-group-item"}>
                                <div>{budget.job.title}</div>
                                <div>{budget.job.worker.firstName + " " + budget.job.worker.lastName}</div>

                            </div>)
                        }))}
                    </div>

                </div>

                <div className={"row"}>
                    <h2> Completed Budget History</h2>
                    <div className={"list-group"}>
                        {completedBudgets?.length === 0 ? (<h2>No budgets yet...</h2>): (completedBudgets?.map((budget) => {
                            return(<div className={"list-group-item"}>
                                <div>{budget.job.title}</div>
                                <div>{budget.job.worker.firstName + " " + budget.job.worker.lastName}</div>

                            </div>)
                        }))}
                    </div>

                </div>

            </div>



        </div>
    );
}

export default Hired;