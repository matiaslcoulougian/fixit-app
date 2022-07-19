import React, {useEffect, useRef, useState} from 'react';
import {GET_BUDGET_BY_WORKER, GET_BUDGET_IMAGE_URLS} from "../../../queries/queries";
import {useLazyQuery, useMutation} from "@apollo/client";
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {BudgetNotification} from "../../BudgetNotification";
import {OpenBudgetModal} from "../../BudgetModal";
import {useNavigate} from "react-router-dom";

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
    const [budgetTime, setBudgetTime] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const navigate = useNavigate()

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

    const [getBudgetImageUrls] = useLazyQuery(
        GET_BUDGET_IMAGE_URLS, {
            onCompleted: (res) => {
                console.log("IMAGES FOUND!")
                console.log("res", res)
                setImageUrls(res.getBudgetImageUrls.imageUrls);
            },
            onError: (err) => {
                console.log(err)
            }
        }
    )

    useEffect(() => {
        getBudgetByWorker()
        if(budgetList) filterPending()
    }, [budgetList, refresh]);

    const handleBudgetClick = async (budget) => {
        await getBudgetImageUrls({variables: {input: {budgetId: budget.id}}});
        setFocusBudget(budget);
        let time = calculateTime(budget.time)
        const lastIndex = time.lastIndexOf(" ");
        time = time.substring(0, lastIndex);
        setBudgetTime(time)
        setOpenModal(true)
    }

    return (
        <div>
            <OpenBudgetModal focusBudget={focusBudget} range={range} setRange={setRange} setRefresh={setRefresh} setOpenModal={setOpenModal} setNotificationMessage={setNotificationMessage} setOpenSnackbar={setOpenSnackbar} setBudgetRejected={setBudgetRejected} openModal={openModal} budgetRejected={budgetRejected} budgetResponded={budgetResponded} time={budgetTime} imageUrls={imageUrls}/>
            <BudgetNotification openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} notificationMessage={notificationMessage}/>
            <div className="card">
            <h3 className="card-header">Budget Requests</h3>
            <div className="card-body">
                {pendingBudgets?.length === 0 && <h6 className={"centered"}>No pending budgets...</h6>}
                <div className="list-group">

                    {pendingBudgets?.slice(0,3).map((budget) => {
                        return(<div className="list-group-item list-group-item-action" role="button" onClick={ async () => await handleBudgetClick(budget)} aria-current="true">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{budget.job.title}</h5>
                                <small>{calculateDays(budget.createdAt) === 0 ? 'Today' :  calculateDays(budget.createdAt) + ' days ago'}</small>
                            </div>
                            <div className="d-flex w-100 justify-content-between">
                                <p className="mb-1">{budget.customer?.firstName}</p>
                                <small> {calculateTime(budget.time)}</small>
                            </div>
                            <small>{budget.description}</small>
                        </div>)
                    })}

                </div>

                {pendingBudgets?.length > 3 && <h4 className="card-text mt-1 ms-2">And {pendingBudgets?.length-3} more...</h4>}

                <button className="btn btn-primary mt-2" onClick={() => navigate('/my-budgets')}>See full list</button>
            </div>
        </div>
        </div>

    );
};


function calculateDays(date){
    const date1 = new Date(date);
    const date2 = new Date();
    const difference = date2.getTime() - date1.getTime();
    return Math.floor(difference / (1000 * 3600 * 24));
}

function calculateTime(time){
    if(!time) return null;
    const toNum = Number(time)
    //if (toNum === 0) return null;
    if (toNum < 60) return 'Less than one minute away'
    else if (toNum < 3600) return `${(time/60).toFixed(0)} minutes away`
    else {
        const hours = ((time/60)/60).toFixed(0)
        const minutes = (time/60).toFixed(0) - 60 * hours;
        return `${hours} hours and ${minutes} away`
    }
}


export default BudgetRequestsCard;
