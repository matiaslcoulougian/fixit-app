import React from 'react';

export const BalanceCard = (props) => {

    // aca tendria que llamar una query que me traiga todos los budgets que fueron PAID
    // con eso, los cuento y digo cuantos se hicieron y luego con el boton los muestro

    return(
        <div>
            <div className="card">
                <h3 className="card-header">Money Made</h3>
                    <div className="card-body">
                        <h3 className="card-title text-center">${props.me.balance}</h3>
                        <h5 className="card-text text-center">20 Jobs done (hardcoded)</h5>
                        <a href="#" className="btn btn-primary">See full list</a>
                    </div>
            </div>
        </div>
    );
}