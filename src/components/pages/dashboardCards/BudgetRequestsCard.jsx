import React, {useEffect, useRef, useState} from 'react';
import {GET_BUDGET_BY_WORKER} from "../../../queries/queries";
import {useLazyQuery, useMutation} from "@apollo/client";
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {BudgetNotification} from "../../BudgetNotification";
import {OpenBudgetModal} from "../../BudgetModal";

const BudgetRequestsCard = () => {

    const [budgetList, setBudgetList] = useState();
    const [pendingBudgets, setPendingBudgets] = useState();
    const [openModal, setOpenModal] = useState(false)
    const [focusBudget, setFocusBudget] = useState()
    const [refresh, setRefresh] = useState(0)
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])
    const [budgetResponded, setBudgetResponded] = useState(false);
    const [budgetRejected, setBudgetRejected] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    function filterPending() {
        let tempList = [];
        for (const budget of budgetList) {
            if(budget.status === "PENDING") tempList.push(budget);
        }
        setPendingBudgets(tempList);
        console.log("tempList", tempList)
    }

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

    useEffect(() => {
        getBudgetByWorker()
        if(budgetList) filterPending()
    }, [budgetList, refresh]);

    const handleBudgetClick = (budget) => {
        setFocusBudget(budget)
        setOpenModal(true)
    }

    return (
        <div>
            <OpenBudgetModal focusBudget={focusBudget} range={range} setRange={setRange} setRefresh={setRefresh} setOpenModal={setOpenModal} setNotificationMessage={setNotificationMessage} setOpenSnackbar={setOpenSnackbar} setBudgetRejected={setBudgetRejected} openModal={openModal} budgetRejected={budgetRejected} budgetResponded={budgetResponded}/>
            <BudgetNotification openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} notificationMessage={notificationMessage}/>
            <div className="card">
            <h3 className="card-header">Budget Requests</h3>
            <div className="card-body">
                {pendingBudgets?.length === 0 && <h6 className={"centered"}>No pending budgets...</h6>}
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
