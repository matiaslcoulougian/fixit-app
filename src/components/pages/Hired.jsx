import React, {useEffect, useState} from 'react';
import {NavBar} from "../NavBar";
import {GET_BUDGET_BY_CUSTOMER} from "../../queries/queries";
import {useLazyQuery, useMutation} from "@apollo/client";
import BackButton from "../BackButton";
import {Modal, Rating} from "@mui/material";
import {CONFIRM_BUDGET, FINISH_BUDGET, RATE_WORKER, REJECT_BUDGET} from "../../queries/mutations";
import {ConfirmedBudgetModal} from "../PaymentForm";
import {BudgetNotification} from "../BudgetNotification";
//import {DeclinedBudgetModal} from "./DeclinedBudgetModal";
import "../../components/styles/Hired.css"

const Hired = (props) => {

    const [pendingBudgets, setPendingBudgets] = useState();
    const [respondedBudgets, setRespondedBudgets] = useState();
    const [acceptedBudgets, setAcceptedBudgets] = useState();
    const [completedBudgets, setCompletedBudgets] = useState();
    const [budgetConfirmed, setBudgetConfirmed] = useState(false);
    const [budgetDeclined, setBudgetDeclined] = useState(false);
    const [budgetFinished, setBudgetFinished] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

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
        let pending = await getBudgetByCustomer({variables:{input:{status: "PENDING"}}})
        console.log("responded", responded)

        setRespondedBudgets(responded.data.getBudgetByCustomer)
        setAcceptedBudgets(accepted.data.getBudgetByCustomer)
        setCompletedBudgets(completed.data.getBudgetByCustomer)
        setPendingBudgets(pending.data.getBudgetByCustomer)
        setRefresh(false)
    }, [refresh]);
    
    const [openRespondedModal, setOpenRespondedModal] = useState(false);

    function handleConfirmation() {
        confirmBudget({variables: {input: {budgetId: focusBudget.id}}})
        setRefresh(true)
        setNotificationMessage('Budget confirmed successfully')
        setOpenSnackbar(true)
        setOpenRespondedModal(false)
    }

    function handleRejection() {
        closeBudget({variables: {input: {budgetId: focusBudget.id}}})
        setRefresh(true)
        //setOpenDeclineModal(true)
        setNotificationMessage('Budget declined successfully')
        setOpenSnackbar(true)
        setOpenRespondedModal(false)
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
        setRefresh(true)
    }

    //TODO:sacar
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
                            <div className="modal-form">
                                <hr/>

                                <div className="container">

                                    <div className="mt-3">
                                        <div className="form-label respond-budget-label" htmlFor="job-title">Job Description</div>
                                        <div id="job-title" rows="3">{focusBudget?.description}</div>
                                    </div>


                                    <div className="mt-3">
                                        <div className="form-label respond-budget-label" htmlFor="job-description">Estimated Cost</div>
                                        <div  id="job-description" rows="3">{"$"+focusBudget?.amount}</div>
                                    </div>

                                    <div className="mt-3">
                                        <div className="form-label respond-budget-label" htmlFor="job-description">Worker's Comments</div>
                                        <div  id="job-description" rows="3">{focusBudget?.details}</div>
                                    </div>

                                    <div className="mt-3">
                                        <div className="form-label respond-budget-label" htmlFor="job-description">Worker's Name</div>
                                        <div id="job-description" rows="3">{focusBudget?.job.worker.firstName + " " + focusBudget?.job.worker.lastName}</div>
                                    </div>

                                    <div className="mt-3">
                                        <div className="form-label respond-budget-label" htmlFor="job-description">Possible Date Range</div>
                                        <div id="job-description" rows="3">{focusBudget?.firstDateFrom + " to " + focusBudget?.firstDateTo}</div>
                                    </div>

                                </div>
                                <hr/>


                            {/*updateJobInfo(newTitle, newDescription)}*/}
                            <div className="modal-footer border-0 pt-0">
                                <button type="button" className="btn btn-secondary" onClick={handleRejection}>Decline</button>
                                <button type="button" className="btn btn-primary"onClick={handleConfirmation}>Confirm</button>
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
            <BudgetNotification openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} notificationMessage={notificationMessage}/>
            <RespondedBudgetModal/>
            {/*<DeclinedBudgetModal openModal={false} setOpenModal={false}/>*/}
            <ConfirmedBudgetModal openConfirmedModal={openConfirmedModal} setOpenConfirmedModal={setOpenConfirmedModal} focusBudget={focusBudget} budgetFinished={budgetFinished}/>
            <NavBar firstName={localStorage.getItem("firstName")}/>
            <BackButton marginLeft={"ms-3"} marginTop={"mt-4"}/>

            <div className={"container"}>
                <div className={"row pb-4"}>
                    <h2>My Sent Requests</h2>
                        <div className="list-group ">
                            {pendingBudgets?.length === 0 ? (<h4 className="no-budget">No budgets yet...</h4>): (pendingBudgets?.map((budget) => {
                                return budgetCard(budget);
                            }))}
                        </div>

                    </div>


                <div className={"row pb-4"}>
                    <h2> Services to Confirm</h2>
                    <div className="list-group" >
                        {respondedBudgets?.length === 0 ? (<h4 className="no-budget">No budgets yet...</h4>): (respondedBudgets?.map((budget) => {
                            return budgetCard(budget, handleClick, "RESPONDED", "confirm");
                        }))}
                    </div>

                </div>

                <div className={"row pb-4"}>
                    <h2> Confirmed Services</h2>
                    <div className={"list-group"}>
                        {acceptedBudgets?.length === 0 ? (<h4 className="no-budget">No budgets yet...</h4>) : (acceptedBudgets?.map((budget) => {
                            return budgetCard(budget, handleClick, "CONFIRMED", "finish");
                        }))}
                    </div>

                </div>

                <div className={"row"}>
                    <h2> Finished Services </h2>
                    <div className={"list-group"}>
                        {completedBudgets?.length === 0 ? (<h4 className="no-budget">No budgets yet...</h4>): (completedBudgets?.map((budget) => {
                            return budgetCard(budget);
                        }))}
                    </div>

                </div>

            </div>

        </div>
    );
}

const budgetCard = (budget, handleClick, status, buttonLabel) =>{
    return(<div className={"list-group-item"}>
        {handleClick && <button className="btn btn-primary button-card" onClick={() => handleClick(budget, status)}> {buttonLabel} </button>}
        <div>{"Title: " + budget.job.title}</div>
        <div>{"Type: " + budget.job.type.replace("_", " ")}</div>
        <div>{"Worker: " + budget.job.worker.firstName + " " + budget.job.worker.lastName}</div>
        <div>{"Description: " + budget.description}</div>
    </div>)
}

export default Hired;