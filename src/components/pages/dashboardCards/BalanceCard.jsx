import React, {useEffect, useState} from 'react';
import {useLazyQuery} from "@apollo/client";
import {GET_BUDGET_BY_WORKER} from "../../../queries/queries";
import { useNavigate } from 'react-router-dom';

export const BalanceCard = (props) => {
    const [budgetsPaid, setBudgetsPaid] = useState([])
    const navigate = useNavigate();

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
        navigate('/balance');
    }

    return(
        <div>
            <div className="card">
                <h3 className="card-header">Money Made</h3>
                    <div className="card-body">
                        <h3 className="card-title text-center">${props.me.balance}</h3>
                        <h5 className="card-text text-center">{budgetsPaid.length + " jobs done"}</h5>
                        <button className="btn btn-primary" onClick={handleFullListClick}>See full list</button>
                    </div>
            </div>
        </div>
    );
}