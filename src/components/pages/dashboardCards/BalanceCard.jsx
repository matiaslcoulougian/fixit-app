import React, {useEffect, useState} from 'react';
import {useLazyQuery} from "@apollo/client";
import {GET_BUDGET_BY_WORKER} from "../../../queries/queries";

export const BalanceCard = (props) => {
    const [budgetsPaid, setBudgetsPaid] = useState([])

    const [getBudgetByWorker] = useLazyQuery(
        GET_BUDGET_BY_WORKER, {
            onCompleted: (res) => {
                setBudgetsPaid(res.getBudgetByWorker)
            },
            onError(err) {
                console.log(err);
            }
        }
    );

    useEffect(() => {
        getBudgetByWorker({variables: {input: { status: "PAID"}}});
    }, []);

    const handleFullListClick = () => {

    }

    return(
        <div>
            <div className="card">
                <h3 className="card-header">Money Made</h3>
                    <div className="card-body">
                        <h3 className="card-title text-center">${props.me.balance}</h3>
                        <h5 className="card-text text-center">{budgetsPaid.length + " jobs done"}</h5>
                        <a href="#" className="btn btn-primary" onClick={handleFullListClick}>See full list</a>
                    </div>
            </div>
        </div>
    );
}