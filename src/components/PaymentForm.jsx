import React, {useEffect, useState} from 'react';
import "./styles/PaymentForm.css";
import {useMutation} from "@apollo/client";
import {FINISH_BUDGET, RATE_WORKER} from "../queries/mutations";
import { useMercadopago } from 'react-sdk-mercadopago';
import {Modal, Rating} from "@mui/material";

export const PaymentForm = (props) => {
    const [budgetId, setBudgetId] = useState()
    const mercadopago = useMercadopago.v2('TEST-c984a881-04f0-424a-838c-4378da9aa7d7', {
        locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
    });
    const [finishBudget] = useMutation(
        FINISH_BUDGET, {
            onCompleted: (res) => {
                console.log("FINISHED!");
                console.log(res.finishBudget)
                createCheckoutButton(res.finishBudget.id);
            },
            onError: (err) => {
                console.log(err)
            }
        }
    );
    async function initiatePayment(){
        if (mercadopago) {
            await finishBudget({variables: {input: {budgetId: budgetId}}})
        }
    }


    function createCheckoutButton(preferenceId) {
        // Initialize the checkout
        console.log('entered initiate payment')
        mercadopago.checkout({
            preference: {
                id: preferenceId
            },
            render: {
                container: '#button-checkout', // Class name where the payment button will be displayed
                label: 'Pay', // Change the payment button text (optional)
            }
        });
    }

    return (<div>
        <div className='payment-form'>
            <input value={budgetId} onChange={(e) => setBudgetId(e.target.value)} type="text" placeholder="Budget Id"/>
            <button className="btn btn-primary btn-lg btn-block" id="checkout-btn" onClick={() => initiatePayment()}> Checkout </button>
            <div id="button-checkout" className='#button-checkout'>
            </div>
        </div>
    </div>);
};

export const ConfirmedBudgetModal = (props) => {
    const [stars, setStars] = useState();
    const [comment, setComment] = useState();

    const mercadopago = useMercadopago.v2('TEST-c984a881-04f0-424a-838c-4378da9aa7d7', {
        locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
    });

    const [finishBudget] = useMutation(
        FINISH_BUDGET, {
            onCompleted: (res) => {
                console.log("FINISHED!");
                console.log(res.finishBudget)
                createCheckoutButton(res.finishBudget.id);
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

    async function initiatePayment(stars, comment, focusBudget){
        if (mercadopago) {
            await finishBudget({variables: {input: {budgetId: focusBudget.id}}})
            await rateWorker({
                variables: {
                    input:{
                        workerId: focusBudget.job.worker.id,
                        stars: stars,
                        comment: comment
                    }
                }
            })
        }
    }

    function createCheckoutButton(preferenceId) {
        // Initialize the checkout
        console.log('entered initiate payment')
        mercadopago.checkout({
            preference: {
                id: preferenceId
            },
            render: {
                container: '#button-checkout', // Class name where the payment button will be displayed
                label: 'Pay', // Change the payment button text (optional)
            }
        });
    }

    return(
        <Modal
            open={props.openConfirmedModal}
            onClose={() => props.setOpenConfirmedModal(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title" id="modal-title">Finish Service</h5>
                        <button type="button" className="btn-close" onClick={() => props.setOpenConfirmedModal(false)} data-bs-dismiss="modal" aria-label="Close"/>

                    </div>

                    <div className="modal-body border-0 py-0">
                        <div className={"modal-form"}>
                            <hr/>

                            <div className="container">

                                <div className="mt-3">
                                    <label className="form-label" htmlFor="job-title">Job Title</label>
                                    <div id="job-title" rows="3">{props.focusBudget?.job.title}</div>
                                </div>

                                <div className="mt-3">
                                    <label className="form-label" htmlFor="job-title">Job Description</label>
                                    <div id="job-title" rows="3">{props.focusBudget?.description}</div>
                                </div>


                                <div className="mt-3">
                                    <label className="form-label" htmlFor="job-description">Worker's Name</label>
                                    <div id="job-description" rows="3">{props.focusBudget?.job.worker.firstName + " " + props.focusBudget?.job.worker.lastName}</div>
                                </div>



                                <div className={"mt-3"}>
                                    <label className="form-label me-2" htmlFor="job-description">Rating</label>
                                    <div>
                                        <Rating
                                            name="simple-controlled"
                                            value={stars}
                                            onChange={(event, newValue) => {
                                                setStars(newValue);
                                            }}
                                        />
                                    </div>

                                </div>

                                <div className={"mt-3"}>
                                    <label className="form-label" htmlFor="job-description">Add a Comment</label>
                                    <div><textarea onChange={(e) => setComment(e.target.value)}></textarea></div>
                                </div>

                                {props.budgetFinished && <div className="alert alert-success mt-2" role="alert">
                                    Job Finished Successfully! Please close this window.
                                </div>}


                            </div>
                            <hr/>


                            {/*updateJobInfo(newTitle, newDescription)}*/}
                            <div className="modal-footer border-0 pt-0">
                                <button type="button" className="btn btn-primary" disabled={props.budgetFinished} onClick={() => initiatePayment(stars, comment, props.focusBudget)}>Finish</button>
                                <div id="button-checkout" className='#button-checkout'>  </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>);
    }