import React, {useEffect, useState} from 'react';
import {NavBar} from "../NavBar";
import {GET_BUDGET_BY_CUSTOMER} from "../../queries/queries";
import {useLazyQuery, useMutation} from "@apollo/client";
import BackButton from "../BackButton";
import {Modal, Rating} from "@mui/material";
import {CONFIRM_BUDGET, FINISH_BUDGET, RATE_WORKER, REJECT_BUDGET} from "../../queries/mutations";

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

    const [closeBudget] = useMutation(
        REJECT_BUDGET, {
            onCompleted: (res) => {
                console.log("CLOSED!");
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
                            <h5 className="modal-title" id="modal-title">Confirm Budget</h5>
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


                                </div>
                                <hr/>


                            {/*updateJobInfo(newTitle, newDescription)}*/}
                            <div className="modal-footer border-0 pt-0">
                                <button type="button" className="btn btn-secondary" onClick={handleRejection}>Decline</button>
                                <button type="button" className="btn btn-primary" onClick={handleConfirmation}>Confirm</button>
                            </div>



                            </div>
                        </div>
                    </div>
                </div>
            </Modal>);
        
        
    }

    const [focusBudget, setFocusBudget] = useState();
    const [openConfirmedModal, setOpenConfirmedModal] = useState()


    const ConfirmedBudgetModal = () => {
        const [stars, setStars] = useState();
        const [comment, setComment] = useState();

        return(
            <Modal
                open={openConfirmedModal}
                onClose={() => setOpenConfirmedModal(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title" id="modal-title">Confirm Budget</h5>
                            <button type="button" className="btn-close" onClick={() => setOpenConfirmedModal(false)} data-bs-dismiss="modal" aria-label="Close"/>

                        </div>

                        <div className="modal-body border-0 py-0">
                            <div className={"modal-form"}>
                                <hr/>

                                <div className="container">

                                    <div className="mt-3">
                                        <label className="form-label" htmlFor="job-title">Job Title</label>
                                        <div className="form-control" id="job-title" rows="3">{focusBudget?.job.title}</div>
                                    </div>

                                    <div className="mt-3">
                                        <label className="form-label" htmlFor="job-title">Job Description</label>
                                        <div className="form-control" id="job-title" rows="3">{focusBudget?.description}</div>
                                    </div>


                                    <div className="mt-3">
                                        <label className="form-label" htmlFor="job-description">Worker's Name</label>
                                        <div className="form-control" id="job-description" rows="3">{focusBudget?.job.worker.firstName + " " + focusBudget?.job.worker.lastName}</div>
                                    </div>



                                    <div className={"mt-3"}>
                                        <label className="form-label" htmlFor="job-description">Rating</label>
                                        <Rating
                                            name="simple-controlled"
                                            value={stars}
                                            onChange={(event, newValue) => {
                                                setStars(newValue);
                                            }}
                                        />
                                    </div>

                                    <div className={"mt-3"}>
                                        <label className="form-label" htmlFor="job-description">Add a Comment</label>
                                        <textarea onChange={(e) => setComment(e.target.value)}></textarea>
                                    </div>


                                </div>
                                <hr/>


                                {/*updateJobInfo(newTitle, newDescription)}*/}
                                <div className="modal-footer border-0 pt-0">
                                    <button type="button" className="btn btn-primary" onClick={() => handleFinished(stars, comment)}>Close Job</button>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </Modal>);


    }



    function handleClick(budget, type) {
        console.log("droga")
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
            <ConfirmedBudgetModal/>
            <NavBar firstName={localStorage.getItem("firstName")}/>
            <BackButton/>

            <div className={"container"}>
                <div className={"row"}>
                    <h2> Budgets to Confirm</h2>
                    <div className={"list-group"}>
                        {respondedBudgets?.length === 0 ? (<h2>No budgets yet...</h2>): (respondedBudgets?.map((budget) => {
                            return(<div role="button" onClick={() => handleClick(budget, "RESPONDED")} className={"list-group-item"}>
                                <div>{budget.job.title}</div>
                                <div>{budget.job.worker.firstName + " " + budget.job.worker.lastName}</div>
                                <div>{budget.description}</div>

                            </div>)
                        }))}
                    </div>

                </div>

                <div className={"row"}>
                    <h2> Confirmed Budgets</h2>
                    <div className={"list-group"}>
                        {acceptedBudgets?.length === 0 ? (<h2>No budgets yet...</h2>) : (acceptedBudgets?.map((budget) => {
                            return(<div className={"list-group-item"} role="button" onClick={() => handleClick(budget, "CONFIRMED")}>
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
                            return(<div role="button" onClick={() => handleClick(budget, "COMPLETED")} className={"list-group-item"}>
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