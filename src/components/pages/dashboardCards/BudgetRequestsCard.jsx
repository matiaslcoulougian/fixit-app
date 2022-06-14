import React from 'react';

const BudgetRequestsCard = () => {
    return (
        <div>
            <div className="card">
            <h3 className="card-header">Incoming Budget Requests</h3>
            <div className="card-body">
                <h3 className="card-title text-center">(a preview of incoming budgets with option buttons)</h3>
                <p className="card-text">[Card with earnings list, eg Job x +$150]</p>
                <a href="#" className="btn btn-primary">See full list</a>
            </div>
        </div>
        </div>
    );
};

export default BudgetRequestsCard;
