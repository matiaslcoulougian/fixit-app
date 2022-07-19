import React, {useEffect, useState} from "react";
import format from "date-fns/format";
import {Modal} from "@mui/material";
import {DateRangeComp} from "./DateRangeComp";
import {useMutation} from "@apollo/client";
import {REJECT_BUDGET, RESPOND_BUDGET} from "../queries/mutations";
import {ImageSlider} from "./ImageSlider.tsx";
import {Map} from "./Map";

export const OpenBudgetModal = (props) => {
    const [estimatedPrice, setEstimatedPrice] = useState();
    const [addedComments, setAddedComments] = useState();
    const [rejectBudget] = useMutation(
        REJECT_BUDGET, {
            onCompleted: (res) => {
                console.log("REJECTED!");
            },
            onError: (err) => {
                console.log(err);
            }
        }
    );

    const [respondBudget] = useMutation(
        RESPOND_BUDGET, {
            onCompleted: (res) => {
                console.log("RESPONDED!")
                console.log(res)
            }, onError: (err) => {
                console.log(err)
            }
        }
    );

    function handleRespondBudget() {
        console.log(estimatedPrice)
        console.log(format(props.range[0].startDate, "MM/dd/yyyy"))
        console.log(format(props.range[0].endDate, "MM/dd/yyyy"))
        console.log(addedComments)

        respondBudget({
            variables:{
                input:{
                    budgetId: props.focusBudget.id,
                    amount: parseFloat(estimatedPrice),
                    details: addedComments,
                    firstDateFrom: format(props.range[0].startDate, "MM/dd/yyyy"),
                    firstDateTo: format(props.range[0].endDate, "MM/dd/yyyy")
                }
            }
        })
        props.setRefresh((refresh) => refresh+1)
        props.setOpenModal(false)
        props.setNotificationMessage("Budget responded successfully!")
        props.setOpenSnackbar(true)
    }

    function handleRejectBudget() {
        props.setBudgetRejected(true)
        rejectBudget({variables: {input: {budgetId: props.focusBudget.id}}})
        props.setRefresh((refresh) => refresh+1)
        props.setOpenModal(false)
        props.setNotificationMessage("Budget rejected successfully!")
        props.setOpenSnackbar(true)
    }

    return(<Modal
        open={props.openModal}
        onClose={() => props.setOpenModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
    >
        <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header border-0 pb-0">
                    <h5 className="modal-title" id="modal-title">Budget Request</h5>
                    <button type="button" className="btn-close" onClick={() => props.setOpenModal(false)} data-bs-dismiss="modal" aria-label="Close"/>

                </div>

                <div className="modal-body border-0 py-0">
                    <div className={"modal-form"}>
                        <hr/>

                        <div className="container">

                            <div className="mt-3">
                                <label className="form-label" htmlFor="job-title"><h5>Job</h5></label>
                                <div id="job-title" rows="3">{props.focusBudget?.job.title}</div>
                            </div>


                            <div className="mt-3">
                                <label className="form-label" htmlFor="job-description"><h5>Description of the Job</h5></label>
                                <div id="job-description" rows="3">{props.focusBudget?.description}</div>
                            </div>

                            <div className="mt-3">
                                <label> <h5>Customer Location </h5></label>
                                {props.focusBudget && <Map lat={Number(props.focusBudget?.customer?.lat)} lon={Number(props.focusBudget?.customer?.lon)}/>}
                            </div>

                            <div className="mt-3">
                                <div id="job-description" rows="3">Approximated time: {props.time} away from you</div>
                            </div>

                            <div className="mt-3">
                                <label className="form-label" htmlFor="job-time"><h5>Images</h5></label>
                                {props.imageUrls && <ImageSlider imageUrls={props.imageUrls}/>}
                            </div>

                        </div>
                        <hr/>

                        <div className="container">

                            <div className="mt-3">
                                <label className="form-label" htmlFor="job-title">Estimated Price (*)</label>
                                <input className="form-control" id="job-title" rows="3" onChange={(e) => setEstimatedPrice(e.target.value)}></input>
                            </div>


                            <div className="mt-3">
                                <label className="form-label" htmlFor="job-description">Date Range for the Job (*)</label>
                                <div className="form-control" id="job-description" rows="3"><DateRangeComp range={props.range} setRange={props.setRange}/></div>
                            </div>

                            <div className="mt-3">
                                <label className="form-label" htmlFor="job-title">Add Comments (*)</label>
                                <textarea className="form-control" id="job-title" rows="3" onChange={(e) => setAddedComments(e.target.value)}></textarea>
                            </div>

                        </div>
                        <div/>



                    </div>
                    <div className="modal-footer border-0 pt-0">
                        <button type="button" className="btn btn-secondary" id='reject-button' onClick={handleRejectBudget} >Decline</button>
                        <button type="button" className="btn btn-primary" id="respond-button"  disabled={!estimatedPrice || !addedComments || !props.range} onClick={handleRespondBudget}>Send</button>
                    </div>


                </div>
            </div>
        </div>
    </Modal>)

}