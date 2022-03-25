import React, {useState} from 'react';
import {Link} from "react-router-dom";
import "./styles/LoginForm.css";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../queries/mutations";

export const LoginForm = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = () =>{
        if(email === '' || password === '') return;

        login({
            variables:{
                email: email,
                password: password,
            }
        })

    }
    const [login] = useMutation(
        LOGIN,
        {
            onCompleted: async (res) => {
                setErrorMessage('');
                //Guardar el token
                console.log("LOGGED IN!")
            },
            onError: (e) => {
                setErrorMessage(e.message);
            },
        }
    );

    const FormInput = (props) => (
        <div class="row">
            <label>{props.description}</label>
            <input type={props.type} onChange= {e => props.function(e.target.value)} placeholder={props.placeholder}/>
        </div>
    );
    const FormHeader = (props) => (
        <h2 id="headerTitle">{props.title}</h2>
    );


    const Form = (props) => (
        <div>
            <FormInput description="Email" placeholder="Enter your email" type="text" function={setEmail}/>
            <FormInput description="Password" placeholder="Enter your password" type="password" variable={props.password}/>
            <FormButton title="Log in" submit={props.submitFunction}/>
        </div>
    );

    const FormButton = props => (
        <div id="button" class="row">
            <button onClick={props.submit}>{props.title}</button>
        </div>
    );



    const RegisterOption = props => (
        <div id="register-form">
            <p>Don't have an account?</p>
            <Link to="/register"><p>Register now!</p></Link>
        </div>
    );




        return(

            <div id="loginform">
                <FormHeader title="Login" />
                <Form submitFunction={handleSubmit} email={email} password={password}/>
                <RegisterOption />
            </div>
        )
}


