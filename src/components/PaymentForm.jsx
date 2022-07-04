import React, {useEffect, useState} from 'react';
import "./styles/PaymentForm.css";
import {useMutation} from "@apollo/client";
import {FINISH_BUDGET} from "../queries/mutations";
import { useMercadopago } from 'react-sdk-mercadopago';

export const PaymentForm = (props) => {
    const mercadopago = useMercadopago.v2('TEST-c984a881-04f0-424a-838c-4378da9aa7d7', {
        locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
    });
    const [finishBudget] = useMutation(
        FINISH_BUDGET, {
            onCompleted: (res) => {
                console.log("FINISHED!");
                console.log(res.finishBudget)
                createCheckoutButton(res.finishBudget.id);
            },
            onError: (err) => {
                console.log(err)
            }
        }
    );
    async function initiatePayment(){
        if (mercadopago) {
            await finishBudget({variables: {input: {budgetId: props.budgetId? props.budgetId : 'budget_asz4tlSSyqT0JySx9YzRl'}}})
        }
    }


    function createCheckoutButton(preferenceId) {
        // Initialize the checkout
        console.log('entered initiate payment')
        mercadopago.checkout({
            preference: {
                id: preferenceId
            },
            render: {
                container: '#button-checkout', // Class name where the payment button will be displayed
                label: 'Pay', // Change the payment button text (optional)
            }
        });
    }

    return (<div>
        <div className='payment-form'>
            <button className="btn btn-primary btn-lg btn-block" id="checkout-btn" onClick={() => initiatePayment()}> Checkout </button>
            <div id="button-checkout" className='#button-checkout'>
            </div>
        </div>
    </div>);
};