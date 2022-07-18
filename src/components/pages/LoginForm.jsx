import React, {useState, useRef, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import "../styles/LoginForm.css";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../../queries/mutations";

export const LoginForm = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()
    async function handleSubmit(){
        //setEmail(useRef().current.value)
        //setPassword(useRef().current.value)

        if(emailRef === '' || passwordRef === '') {
            return
            //todo: show error to complete fields
        }

        const response = await login({
            variables:{
                credential: emailRef.current.value,
                password: passwordRef.current.value
            }
        });
        console.log(response)

    }


    const [login, {data, loading, error}] = useMutation(
        LOGIN,
        {
            onCompleted: async (res) => {
                setErrorMessage('');
                console.log(res)
                const token = res.login.accessToken
                console.log(token)
                const firstName = res.login.user.firstName
                const role = res.login.user.role
                const id = res.login.user.id
                window.localStorage.setItem('token', token)
                window.localStorage.setItem('firstName', firstName)
                window.localStorage.setItem('userId', id)
                window.localStorage.setItem('userRole', role)
                if (res.login.user.role === "customer") navigate('/home')
                else navigate('/dashboard')
            },
            onError: (e) => {
                setErrorMessage(e.message);
            },
        }
    );

    const FormInput = (props) => (
        <div className="fieldRow-b">
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
            <div className="fieldRow-b">
                <label>Email</label>
                <input ref={emailRef} type="text" placeholder="Enter your email"/>
            </div>

            <div className="fieldRow-b">
                <label>Password</label>
                <input ref={passwordRef}  onKeyPress={handleKeyPressed} type="password" placeholder="Enter your password"/>
            </div>

            {/*<FormInput onChange={(e) => setPassword(e.target.value)} description="Password" placeholder="Enter your password" type="password" variable={props.password}/>*/}
            {errorMessage && <div className="login-error"> {errorMessage} </div>}
            <div className={"d-flex justify-content-center"}>
                {loading && <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}

            </div>

            <FormButton title="Log in" submit={props.submitFunction}/>
        </div>
    );

    const FormButton = props => (
        <div id="button" className="fieldRow-b">
            <button onClick={handleSubmit} >{props.title}</button>
        </div>
    );

    const handleKeyPressed = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

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


