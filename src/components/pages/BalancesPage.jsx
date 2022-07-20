import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {GET_BUDGET_BY_WORKER} from '../../queries/queries';
import {NavBar} from "../NavBar";
import BackButton from '../BackButton';

export const BalancesPage = () => {

    const [paidBudgets, setPaidBudgets] = useState();

    const [getBudgetByWorker] = useLazyQuery(
        GET_BUDGET_BY_WORKER, {
            onCompleted: (res) => {
                console.log(res)
                setPaidBudgets(res.getBudgetByWorker);
                return res;
            },
            onError(err) {
                console.log(err);
            }
        }
    );

    useEffect(async () => {
        let retrievedBudgets = await getBudgetByWorker({variables: { input: {status: "PAID"} } }); //el formato de la query con el input hay que hacerlo
        console.log("retrieved", retrievedBudgets);

    }, [paidBudgets])




    const BudgetCard = (budget) => {
        return(<div className={"list-group-item"}>
            <div className="row">
                <div className="col-6">
                    <div>{"Title: " + budget.job.title}</div>
                    <div>{"Type: " + budget.job.type.replace("_", " ")}</div>
                    <div>{"Date: " + budget.dateAgreed}</div>
                    <div>{"Client: " + budget.customer.firstName + " " + budget.customer.lastName}</div>
                </div>
                <div className="col-6 text-end">
                    <div className='d-flex flex-row align-items-center justify-content-end'>
                        <h2><div style={{display:"inline-block", width:"7.5rem"}} className="badge bg-success text-wrap mt-3 " >+ ${budget.amount}</div></h2>
                    </div>
                </div>
            </div>
        </div>)
    }
    return(
        <div className='bg-light'>
            <NavBar firstName={localStorage.getItem("firstName")}/>
            <BackButton marginLeft={"ms-3"} marginTop={"mt-4"}/>
            <div className={"container bg-light"} >
                    <h1 className="col-10 mx-auto justify-content-center mb-4">My Earnings</h1>
                    <div className="col-10 mx-auto justify-content-center">
                        <div className={"card"}>
                            <div className="card-body">
                                <div className="list-group">
                                    {paidBudgets?.length === 0 ? (<h4 className="no-budget">No earnings yet...</h4>): (paidBudgets?.map((budget) => {
                                        return BudgetCard(budget);
                                    }))}
                                </div>
                            </div>
                            
                        </div>
                    </div>
            </div>
        </div>
    );

}