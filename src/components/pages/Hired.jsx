import React, {useEffect, useState} from 'react';
import {NavBar} from "../NavBar";
import {GET_BUDGET_BY_CUSTOMER} from "../../queries/queries";
import {useLazyQuery} from "@apollo/client";
import BackButton from "../BackButton";

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


    useEffect(async () => {
        let responded = await getBudgetByCustomer({variables:{input:{status: "RESPONDED"}}})
        let accepted = await getBudgetByCustomer({variables:{input:{status: "ACCEPTED"}}})
        let completed = await getBudgetByCustomer({variables:{input:{status: "COMPLETED"}}})
        console.log("responded", responded)

        setRespondedBudgets(responded.data.getBudgetByCustomer)
        setAcceptedBudgets(accepted.data.getBudgetByCustomer)
        setCompletedBudgets(completed.data.getBudgetByCustomer)
    }, []);


    return (
        <div>
            <NavBar firstName={localStorage.getItem("firstName")}/>
            <BackButton/>

            <div className={"container"}>
                <div className={"row"}>
                    <h2> Budgets to Confirm</h2>
                    <div className={"list-group"}>
                        {respondedBudgets?.length === 0 ? (<h2>No budgets yet...</h2>): (respondedBudgets?.map((budget) => {
                            return(<div className={"list-group-item"}>
                                <div>{budget.job.title}</div>
                                <div>{budget.job.worker.firstName + " " + budget.job.worker.lastName}</div>

                            </div>)
                        }))}
                    </div>

                </div>

                <div className={"row"}>
                    <h2> Confirmed Budgets</h2>
                    <div className={"list-group"}>
                        {acceptedBudgets?.length === 0 ? (<h2>No budgets yet...</h2>) : (acceptedBudgets?.map((budget) => {
                            return(<div className={"list-group-item"}>
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
                            return(<div className={"list-group-item"}>
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