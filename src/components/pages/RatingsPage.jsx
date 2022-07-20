import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {GET_BUDGET_BY_WORKER, GET_BUDGET_IMAGE_URLS, GET_WORKER_RATINGS} from '../../queries/queries';
import {NavBar} from "../NavBar";
import BackButton from '../BackButton';
import {OpenBudgetModal} from "../BudgetModal";
import {BudgetNotification} from "../BudgetNotification";
import {addDays} from "date-fns";
import {calculateTime} from "./dashboardCards/BudgetRequestsCard";
import { useLocation } from 'react-router-dom';

export const RatingsPage = () => {

    const [pendingBudgets, setPendingBudgets] = useState();
    const [refresh, setRefresh] = useState(true);
    const [ratings, setRatings] = useState();
    const {state} = useLocation();
    const {workerId} = state;

    const [getWorkerRatings] = useLazyQuery(
        GET_WORKER_RATINGS, {
            onCompleted: (res) => {
                console.log(res)
                return res.getWorkerRatings;
            }, 
            onError(err) {
                console.log(err);
            }
        }
    );

    useEffect(async () => {
        let retrievedRatings = await getWorkerRatings({variables: { input: {workerId: workerId} } }); //el formato de la query con el input hay que hacerlo
        setRatings(retrievedRatings.data.getWorkerRatings);
        setRefresh(false)
        
    }, [refresh])

    const ReviewCard = (stars, comment) => {
        return(
            <div className='list-group-item'>
                <div>
                    <div className="row">
                    <h4><span>{stars}<i className="bi bi-star-fill "></i><i className="bi bi-star-fill "></i></span></h4>
                    </div>
                </div>

            </div>

        );
    }
    

    const BudgetCard = (budget, handleClick, buttonLabel, status) => {
        return(<div className={"list-group-item"}>
            {handleClick && <button className="btn btn-primary button-card" onClick={() => handleClick(budget)}> {buttonLabel} </button>}
            <div>{"Title: " + budget.job.title}</div>
            <div>{"Type: " + budget.job.type.replace("_", " ")}</div>
            <div>{"Rating: " + budget.job.type.replace("_", " ")}</div>
            <div>{"Comment: " + budget.customer.firstName + " " + budget.customer.lastName}</div>
            
            {budget.status !== "PENDING" && <div>{"Date range: " + budget.firstDateFrom + " - " + budget.firstDateTo}</div>}
            {budget.status !== "PENDING" && <div>{"Price: $" + budget.amount}</div>}
        </div>)
    }


    return(
        <div>
            <NavBar firstName={localStorage.getItem("firstName")}/>
            <BackButton marginLeft={"ms-3"} marginTop={"mt-4"}/>
            <div className={"container bg-light"} >
                <div className={"row"}>
                    <h1>My Reviews</h1>
                    <div className={"card"}>
                        <div className="list-group">
                            {ratings?.length === 0 ? (<h4 className="no-budget">No reviews yet...</h4>): (ratings?.map((rating) => {
                                return ReviewCard(rating.stars, rating.comment);
                            }))}
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    );

}