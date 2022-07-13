import React, {useEffect, useState} from 'react';
import {NavBar} from "../NavBar";
import {GET_BUDGET_BY_CUSTOMER} from "../../queries/queries";
import {useLazyQuery, useMutation} from "@apollo/client";
import BackButton from "../BackButton";
import {Modal, Rating} from "@mui/material";
import {CONFIRM_BUDGET, FINISH_BUDGET, RATE_WORKER, REJECT_BUDGET} from "../../queries/mutations";
import {ConfirmedBudgetModal} from "../PaymentForm";

const Hired = (props) => {

    const [respondedBudgets, setRespondedBudgets] = useState();
    const [acceptedBudgets, setAcceptedBudgets] = useState();
    const [completedBudgets, setCompletedBudgets] = useState();
    const [budgetConfirmed, setBudgetConfirmed] = useState(false);
    const [budgetDeclined, setBudgetDeclined] = useState(false);
    const [budgetFinished, setBudgetFinished] = useState(false);

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

    const [closeBudget] = useMutation(
        REJECT_BUDGET, {
            onCompleted: (res) => {
                console.log("CLOSED!");
                setBudgetDeclined(true)
            },
            onError: (err) => {
                console.log(err)
            }
        }
    )

    const [confirmBudget] = useMutation(
        CONFIRM_BUDGET, {
            onCompleted: (res) => {
                console.log("CONFIRMED!");
                setBudgetConfirmed(true)
            },
            onError: (err) => {
                console.log(err)
            }
        }
    );

    const [finishBudget] = useMutation(
        FINISH_BUDGET, {
            onCompleted: (res) => {
                console.log("FINISHED!");
            },
            onError: (err) => {
                console.log(err)
            }
        }
    );

    const [rateWorker] = useMutation(
        RATE_WORKER, {
            onCompleted: (res) => {
                console.log("RATED!");
            },
            onError: (err) => {
                console.log(err)
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
    
    const [openRespondedModal, setOpenRespondedModal] = useState(false);

    function handleConfirmation() {
        confirmBudget({variables: {input: {budgetId: focusBudget.id}}})
    }

    function handleRejection() {
        closeBudget({variables: {input: {budgetId: focusBudget.id}}})
    }

    function handleFinished(stars, comment) {
        setBudgetFinished(true)
        finishBudget({variables: {input: {budgetId: focusBudget.id}}})
        rateWorker({
            variables: {
                input:{
                    workerId: focusBudget.job.worker.id,
                    stars: stars,
                    comment: comment
                }
            }
        })
    }

    const RespondedBudgetModal = () => {

        
        return(
            <Modal
                open={openRespondedModal}
                onClose={() => setOpenRespondedModal(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title" id="modal-title">Confirm Service</h5>
                            <button type="button" className="btn-close" onClick={() => setOpenRespondedModal(false)} data-bs-dismiss="modal" aria-label="Close"/>

                        </div>

                        <div className="modal-body border-0 py-0">
                            <div className={"modal-form"}>
                                <hr/>

                                <div className="container">

                                    <div className="mt-3">
                                        <label className="form-label" htmlFor="job-title">Job Description</label>
                                        <div className="form-control" id="job-title" rows="3">{focusBudget?.description}</div>
                                    </div>


                                    <div className="mt-3">
                                        <label className="form-label" htmlFor="job-description">Estimated Cost</label>
                                        <div className="form-control" id="job-description" rows="3">{"$"+focusBudget?.amount}</div>
                                    </div>

                                    <div className="mt-3">
                                        <label className="form-label" htmlFor="job-description">Worker's Comments</label>
                                        <div className="form-control" id="job-description" rows="3">{focusBudget?.details}</div>
                                    </div>

                                    <div className="mt-3">
                                        <label className="form-label" htmlFor="job-description">Worker's Name</label>
                                        <div className="form-control" id="job-description" rows="3">{focusBudget?.job.worker.firstName + " " + focusBudget?.job.worker.lastName}</div>
                                    </div>

                                    <div className="mt-3">
                                        <label className="form-label" htmlFor="job-description">Possible Date Range</label>
                                        <div className="form-control" id="job-description" rows="3">{focusBudget?.firstDateFrom + " to " + focusBudget?.firstDateTo}</div>
                                    </div>

                                    {budgetConfirmed && <div className="alert alert-success mt-2" role="alert">
                                        Job Confirmed Successfully! Please close this window.
                                    </div>}

                                    {budgetDeclined && <div className="alert alert-success mt-2" role="alert">
                                        Job Declined Successfully! Please close this window.
                                    </div>}

                                </div>
                                <hr/>


                            {/*updateJobInfo(newTitle, newDescription)}*/}
                            <div className="modal-footer border-0 pt-0">
                                <button type="button" className="btn btn-secondary" disabled={budgetDeclined || budgetConfirmed}  onClick={handleRejection}>Decline</button>
                                <button type="button" className="btn btn-primary" disabled={budgetDeclined || budgetConfirmed}  onClick={handleConfirmation}>Confirm</button>
                            </div>



                            </div>
                        </div>
                    </div>
                </div>
            </Modal>);
        
        
    }

    const [focusBudget, setFocusBudget] = useState();
    const [openConfirmedModal, setOpenConfirmedModal] = useState()

    function handleClick(budget, type) {
        setFocusBudget(budget)

        if (type === "RESPONDED") {
            setOpenRespondedModal(true);
        } else if (type === "CONFIRMED") {
            setOpenConfirmedModal(true);
        }


    }

    return (
        <div>
            <RespondedBudgetModal/>
            <ConfirmedBudgetModal openConfirmedModal={openConfirmedModal} setOpenConfirmedModal={setOpenConfirmedModal} focusBudget={focusBudget} budgetFinished={budgetFinished}/>
            <NavBar firstName={localStorage.getItem("firstName")}/>
            <BackButton marginLeft={"ms-3"} marginTop={"mt-4"}/>

            <div className={"container"}>
                <div className={"row pb-4"}>
                    <div className="list-group ">
                        <h2> Services to Confirm</h2>
                        {respondedBudgets?.length === 0 ? (<h4>No budgets yet...</h4>): (respondedBudgets?.map((budget) => {
                            return(<div role="button" onClick={() => handleClick(budget, "RESPONDED")} className={"list-group-item"}>
                                <div>{"Title: " + budget.job.title}</div>
                                <div>{"Worker: " + budget.job.worker.firstName + " " + budget.job.worker.lastName}</div>
                                <div>{"Description: " + budget.description}</div>

                            </div>)
                        }))}
                    </div>

                </div>

                <div className={"row pb-4"}>
                    <div className={"list-group"}>
                        <h2> Confirmed Services</h2>
                        {acceptedBudgets?.length === 0 ? (<h4>No budgets yet...</h4>) : (acceptedBudgets?.map((budget) => {
                            return(<div className={"list-group-item"} role="button" onClick={() => handleClick(budget, "CONFIRMED")}>
                                <div>{"Title: " +  budget.job.title}</div>
                                <div>{"Worker: " + budget.job.worker.firstName + " " + budget.job.worker.lastName}</div>
                                <div>{"Description: " + budget.description}</div>
                            </div>)
                        }))}
                    </div>

                </div>

                <div className={"row"}>
                    <div className={"list-group"}>
                        <h2> Finished Services </h2>
                        {completedBudgets?.length === 0 ? (<h4>No budgets yet...</h4>): (completedBudgets?.map((budget) => {
                            return(<div role="button" onClick={() => handleClick(budget, "COMPLETED")} className={"list-group-item"}>
                                <div>{"Title: " + budget.job.title}</div>
                                <div>{"Worker: " + budget.job.worker.firstName + " " + budget.job.worker.lastName}</div>
                                <div>{"Description: " + budget.description}</div>
                            </div>)
                        }))}
                    </div>

                </div>

            </div>



        </div>
    );
}

export default Hired;