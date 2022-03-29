import React, {useState, useRef} from 'react';
import {Link} from "react-router-dom";
import "./styles/LoginForm.css";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../queries/mutations";

export const LoginForm = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [token, setToken] = useState('')

    const emailRef = useRef()
    const passwordRef = useRef()

    function handleSubmit(){
        //setEmail(useRef().current.value)
        //setPassword(useRef().current.value)

        if(emailRef === '' || passwordRef === '') {
            return;
        }

        const response = login({
            variables:{
                credential: emailRef.current.value,
                password: passwordRef.current.value
            }
        })
        console.log(response)

    }
    const [login] = useMutation(
        LOGIN,
        {
            onCompleted: async (res) => {
                console.log(res)
                setErrorMessage('');
                const token = res['login']['accessToken'];
                setToken(token);
                console.log("the token is: ", token)
                //Guardar el token
                console.log("LOGGED IN!")
            },
            onError: (e) => {
                setErrorMessage(e.message);
            },
        }
    );

    const FormInput = (props) => (
        <div className="row">
            <label>{props.description}</label>
            <input type={props.type} placeholder={props.placeholder}/>
        </div>
    );
    const FormHeader = (props) => (
        <h2 id="headerTitle">{props.title}</h2>
    );


    const Form = (props) => (
        <div>
            {/*<FormInput onChange={(e) => setEmail(e.target.value)} description="Email" placeholder="Enter your email" type="text" function={setEmail}/>*/}
            <div className="row">
                <label>Email</label>
                <input ref={emailRef} type="text" placeholder="Enter your email"/>
            </div>

            <div className="row">
                <label>Password</label>
                <input ref={passwordRef} type="password" placeholder="Enter your password"/>
            </div>

            {/*<FormInput onChange={(e) => setPassword(e.target.value)} description="Password" placeholder="Enter your password" type="password" variable={props.password}/>*/}
            {errorMessage && <div className="login-error"> {errorMessage} </div>}
            <FormButton title="Log in" submit={props.submitFunction}/>
        </div>
    );

    const FormButton = props => (
        <div id="button" class="row">
            <button onClick={handleSubmit}>{props.title}</button>
        </div>
    );



    const RegisterOption = props => (
        <div id="register-form">
            <p>Don't have an account?</p>
            <Link to="/register" className="nav-link"><p>Register now!</p></Link>
        </div>
    );




        return(
        <div id="bigger-div">
            <div id="loginform">
                <FormHeader title="Login" />
                <Form submitFunction={handleSubmit} email={email} password={password}/>
                <RegisterOption />
            </div>
            </div>
        )
}


