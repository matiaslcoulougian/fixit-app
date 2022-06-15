import React, {useEffect, useRef, useState} from 'react';
import {GET_BUDGET_BY_WORKER} from "../../../queries/queries";
import {useLazyQuery, useMutation} from "@apollo/client";
import {Modal} from "@mui/material";
import { DateRange } from 'react-date-range'
import format from 'date-fns/format'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {REJECT_BUDGET, RESPOND_BUDGET} from "../../../queries/mutations";

const BudgetRequestsCard = () => {

    const [budgetList, setBudgetList] = useState();
    const [pendingBudgets, setPendingBudgets] = useState();
    const [openModal, setOpenModal] = useState(false)
    const [focusBudget, setFocusBudget] = useState()
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])
    const DateRangeComp = () => {

        // date state


        // open close
        const [open, setOpen] = useState(false)

        // get the target element to toggle
        const refOne = useRef(null)

        useEffect(() => {
            // event listeners
            document.addEventListener("keydown", hideOnEscape, true)
            document.addEventListener("click", hideOnClickOutside, true)
        }, [])

        // hide dropdown on ESC press
        const hideOnEscape = (e) => {
            // console.log(e.key)
            if( e.key === "Escape" ) {
                setOpen(false)
            }
        }

        // Hide on outside click
        const hideOnClickOutside = (e) => {
            // console.log(refOne.current)
            // console.log(e.target)
            if( refOne.current && !refOne.current.contains(e.target) ) {
                setOpen(false)
            }
        }

        return (
            <div className="calendarWrap">

                <input
                    value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
                    readOnly
                    className="inputBox"
                    onClick={ () => setOpen(open => !open) }
                />

                <div ref={refOne}>
                    {open &&
                        <DateRange
                            onChange={item => setRange([item.selection])}
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={false}
                            ranges={range}
                            months={1}
                            direction="horizontal"
                            className="calendarElement"
                        />
                    }
                </div>

            </div>
        )
    }

    function filterPending() {
        let tempList = [];
        for (const budget of budgetList) {
            if(budget.status === "PENDING") tempList.push(budget);
        }
        setPendingBudgets(tempList);
        console.log("tempList", tempList)
    }

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

    const [getBudgetByWorker, {loading}] = useLazyQuery(
        GET_BUDGET_BY_WORKER, {
            onCompleted: (res) => {
                console.log("WORKED!")
                console.log("res", res)
                setBudgetList(res.getBudgetByWorker)
            },
            onError: (err) => {
                console.log(err)
            }
        }

    );

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

    useEffect(() => {
        getBudgetByWorker()
        if(budgetList) filterPending()
    }, [budgetList]);


    function handleRejectBudget() {
        setOpenModal(false)
        rejectBudget({variables: {input: {budgetId: focusBudget.id}}})
    }



    const OpenBudgetModal = () => {

        const [estimatedPrice, setEstimatedPrice] = useState();
        const [addedComments, setAddedComments] = useState();
        const [dateFrom, setDateFrom] = useState();
        const [dateTo, setDateTo] = useState();

        function handleRespondBudget() {
            console.log(estimatedPrice)
            console.log(format(range[0].startDate, "MM/dd/yyyy"))
            console.log(format(range[0].endDate, "MM/dd/yyyy"))
            console.log(addedComments)

            respondBudget({
                variables:{
                    input:{
                        budgetId: focusBudget.id,
                        amount: parseFloat(estimatedPrice),
                        details: addedComments,
                        firstDateFrom: format(range[0].startDate, "MM/dd/yyyy"),
                        firstDateTo: format(range[0].endDate, "MM/dd/yyyy")
                    }
                }
            })
        }

        return(<Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title" id="modal-title">Budget Request</h5>
                        <button type="button" className="btn-close" onClick={() => setOpenModal(false)} data-bs-dismiss="modal" aria-label="Close"/>

                    </div>

                    <div className="modal-body border-0 py-0">
                        <div className={"modal-form"}>
                        <hr/>

                        <div className="container">

                            <div className="mt-3">
                                <label className="form-label" htmlFor="job-title">Job</label>
                                <div className="form-control" id="job-title" rows="3">{focusBudget?.job.title}</div>
                            </div>


                            <div className="mt-3">
                                <label className="form-label" htmlFor="job-description">Description of the Job</label>
                                <div className="form-control" id="job-description" rows="3">{focusBudget?.description}</div>
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
                                <div className="form-control" id="job-description" rows="3"><DateRangeComp/></div>
                            </div>

                            <div className="mt-3">
                                <label className="form-label" htmlFor="job-title">Add Comments (*)</label>
                                <textarea className="form-control" id="job-title" rows="3" onChange={(e) => setAddedComments(e.target.value)}></textarea>
                            </div>

                        </div>
                            <div/>



                    </div>
                    {/*updateJobInfo(newTitle, newDescription)}*/}
                    <div className="modal-footer border-0 pt-0">
                        <button type="button" className="btn btn-secondary" onClick={handleRejectBudget} >Decline</button>
                        <button type="button" className="btn btn-primary" onClick={handleRespondBudget}>Send</button>
                    </div>



                </div>
                </div>
            </div>
        </Modal>)

    }

    const handleBudgetClick = (budget) => {
        setFocusBudget(budget)
        setOpenModal(true)
    }



    return (
        <div>
            <OpenBudgetModal/>
            <div className="card">
            <h3 className="card-header">Budget Requests</h3>
            <div className="card-body">

                <div className="list-group">

                    {pendingBudgets?.slice(0,3).map((budget) => {
                        return(<div className="list-group-item list-group-item-action" role="button" onClick={() => handleBudgetClick(budget)} aria-current="true">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{budget.job.title}</h5>
                                <small>3 days ago</small>
                            </div>
                            <p className="mb-1">{budget.customer?.firstName}</p>
                            <small>{budget.description}</small>
                        </div>)
                    })}

                </div>

                {pendingBudgets?.length > 3 && <h4 className="card-text mt-1 ms-2">And {pendingBudgets?.length-3} more...</h4>}

                <button className="btn btn-primary">See full list</button>
            </div>
        </div>
        </div>
    );
};





export default BudgetRequestsCard;
