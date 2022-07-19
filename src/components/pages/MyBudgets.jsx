import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {GET_BUDGET_BY_WORKER, GET_BUDGET_IMAGE_URLS} from '../../queries/queries';
import {NavBar} from "../NavBar";
import BackButton from '../BackButton';
import {OpenBudgetModal} from "../BudgetModal";
import {BudgetNotification} from "../BudgetNotification";
import {addDays} from "date-fns";
import {calculateTime} from "./dashboardCards/BudgetRequestsCard";

export const MyBudgets = () => {

    const [pendingBudgets, setPendingBudgets] = useState();
    const [respondedBudgets, setRespondedBudgets] = useState();
    const [acceptedBudgets, setAcceptedBudgets] = useState();
    const [refresh, setRefresh] = useState(true);
    const [getBudgetByWorker] = useLazyQuery(
        GET_BUDGET_BY_WORKER, {
            onCompleted: (res) => {
                return res;
            }, 
            onError(err) {
                console.log(err);
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
    const [showBudgetModal, setShowBudgetModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [budgetRejected, setBudgetRejected] = useState()
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])
    const [focusBudget, setFocusBudget] = useState()
    const [budgetTime, setBudgetTime] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [budgetResponded, setBudgetResponded] = useState(false);

    useEffect(async () => {
        let incomingBudgets = await getBudgetByWorker({variables: { input: {status: "PENDING"} } }); //el formato de la query con el input hay que hacerlo
        let responded = await getBudgetByWorker({variables: { input: {status: "RESPONDED"} }});
        let confirmedBudgets = await getBudgetByWorker({variables: { input: {status: "ACCEPTED"} }});
        setPendingBudgets(incomingBudgets.data.getBudgetByWorker);
        setRespondedBudgets(responded.data.getBudgetByWorker);
        setAcceptedBudgets(confirmedBudgets.data.getBudgetByWorker);
        setRefresh(false)
    }, [refresh])

    const handleBudgetClick = async (budget) => {
        await getBudgetImageUrls({variables: {input: {budgetId: budget.id}}});
        setFocusBudget(budget);
        let time = calculateTime(budget.time)
        const lastIndex = time.lastIndexOf(" ");
        time = time.substring(0, lastIndex);
        setBudgetTime(time)
        setShowBudgetModal(true)
    }

    const BudgetCard = (budget, handleClick, buttonLabel, status) => {
        return(<div className={"list-group-item"}>
            {handleClick && <button className="btn btn-primary button-card" onClick={() => handleClick(budget)}> {buttonLabel} </button>}
            <div>{"Title: " + budget.job.title}</div>
            <div>{"Type: " + budget.job.type.replace("_", " ")}</div>
            <div>{"Client: " + budget.customer.firstName + " " + budget.customer.lastName}</div>
            <div>{"Description: " + budget.description}</div>
            {budget.status !== "PENDING" && <div>{"Date range: " + budget.firstDateFrom + " - " + budget.firstDateTo}</div>}
            {budget.status !== "PENDING" && <div>{"Price: $" + budget.amount}</div>}
        </div>)
    }


    return(
        <div>
            <OpenBudgetModal focusBudget={focusBudget} range={range} setRange={setRange} setRefresh={setRefresh} setOpenModal={setShowBudgetModal} setNotificationMessage={setNotificationMessage} setOpenSnackbar={setOpenSnackbar} setBudgetRejected={setBudgetRejected} openModal={showBudgetModal} budgetRejected={budgetRejected} budgetResponded={budgetResponded} time={budgetTime} imageUrls={imageUrls}/>
            <BudgetNotification openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} notificationMessage={notificationMessage}/>
            <NavBar firstName={localStorage.getItem("firstName")}/>
            <BackButton marginLeft={"ms-3"} marginTop={"mt-4"}/>
            <div className={"container"}>
                    <div className={"row pb-4"}>
                        <h2>Incoming Requests</h2>
                            <div className="list-group ">
                                {pendingBudgets?.length === 0 ? (<h4 className="no-budget">No budgets yet...</h4>): (pendingBudgets?.map((budget) => {
                                    return BudgetCard(budget, handleBudgetClick, "respond", "PENDING");
                                }))}
                            </div>
                    </div>

                    <div className={"row pb-4"}>
                        <h2>Client Confirmation Pending</h2>
                        <div className="list-group" >
                            {respondedBudgets?.length === 0 ? (<h4 className="no-budget">No budgets yet...</h4>): (respondedBudgets?.map((budget) => {
                                return BudgetCard(budget);
                            }))}
                        </div>

                    </div>

                    <div className={"row pb-4"}>
                        <h2>Active Services</h2>
                        <div className="list-group" >
                            {acceptedBudgets?.length === 0 ? (<h4 className="no-budget">No budgets yet...</h4>): (respondedBudgets?.map((budget) => {
                                return BudgetCard(budget);
                            }))}
                        </div>

                    </div>
            </div>
        </div>
    );

}