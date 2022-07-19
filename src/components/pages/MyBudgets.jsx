import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_BUDGET_BY_WORKER } from '../../queries/queries';
import {NavBar} from "../NavBar";
import BackButton from '../BackButton';

export const MyBudgets = () => {

    const [pendingBudgets, setPendingBudgets] = useState();
    const [respondedBudgets, setRespondedBudgets] = useState();
    const [acceptedBudgets, setAcceptedBudgets] = useState();

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

    useEffect(() => {
        // let incomingBudgets = await getBudgetByWorker({variables: {state: "PENDING"}}); //el formato de la query con el input hay que hacerlo
        // let responded = await getBudgetByWorker({variables: {state: "RESPONDED"}});
        // let confirmedBudgets = await getBudgetByWorker({variables: {state: "ACCEPTED"}});
        // setPendingBudgets(incomingBudgets.data.getBudgetByWorker);
        // setRespondedBudgets(responded.data.getBudgetByWorker);
        // setAcceptedBudgets(confirmedBudgets.data.getBudgetByWorker);
    })





    return(
        <div>
            <NavBar firstName={localStorage.getItem("firstName")}/>
            <BackButton marginLeft={"ms-3"} marginTop={"mt-4"}/>
            <div className={"container"}>
                    <div className={"row pb-4"}>
                        <h2>Incoming Budget Requests</h2>
                            <div className="list-group ">
                                {pendingBudgets?.length === 0 ? (<h4 className="no-budget">No budgets yet...</h4>): (pendingBudgets?.map((budget) => {
                                    return BudgetCard(budget);
                                }))}
                            </div>

                    </div>

                    <div className={"row pb-4"}>
                        <h2>Waiting for Client to Accept</h2>
                        <div className="list-group" >
                            {respondedBudgets?.length === 0 ? (<h4 className="no-budget">No budgets yet...</h4>): (respondedBudgets?.map((budget) => {
                                return BudgetCard(budget);
                            }))}
                        </div>

                    </div>

                    <div className={"row pb-4"}>
                        <h2>Services to Do</h2>
                        <div className="list-group" >
                            {acceptedBudgets?.length === 0 ? (<h4 className="no-budget">No budgets yet...</h4>): (respondedBudgets?.map((budget) => {
                                return BudgetCard(budget);
                            }))}
                        </div>

                    </div>
            </div>
        </div>
    );

    const BudgetCard = (budget) => {
        return(<div className={"list-group-item"}>
        <div>{"Title: " + budget.job.title}</div>
        <div>{"Type: " + budget.job.type}</div>
        <div>{"Client: " + budget.customer.firstName + " " + budget.customer.lastName}</div>
        <div>{"Description: " + budget.description}</div>
    </div>)
    }

}