import React, {useRef, useState} from "react";
import {useMutation} from "@apollo/client";
import {LOGIN, REGISTER} from "../queries/mutations";
import {Link} from "react-router-dom";
import Modal from "./RegisterModal";
import "./styles/RegisterForm.css";

export const RegisterForm = () =>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDoB] = useState('');
    const [address, setAddress] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const confirmEmailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const phoneRef = useRef();
    const dobRef = useRef();
    const addressRef = useRef();


    const [register] = useMutation(
        REGISTER,
        {
            onCompleted: async (res) => {
                setErrorMessage('');
                setModalVisible(true);
            },
            onError: (e) => {
                setErrorMessage(e.message);
            },
        }
    );

    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };

    function handleRegister () {
        console.log(firstNameRef.current.value);

        if (firstNameRef === '' || lastNameRef === '' || emailRef === '' || passwordRef === '' || phoneRef === '' ||
            dobRef === '' || addressRef === '' || confirmEmailRef === '' || confirmPasswordRef === '') {
            setErrorMessage('All fields are required');
            return;
        }
        else if (emailRef.current.value !== confirmEmailRef.current.value) {
            console.log(emailRef.current.value, confirmEmailRef.current.value);
            setErrorMessage('Emails should match');
            return;
        }
        else if (passwordRef.current.value !== confirmPasswordRef.current.value){
            setErrorMessage('Passwords should match');
            return;
        }
        register({
            variables: {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: emailRef.current.value,
                phoneNumber: phoneRef.current.value,
                password: passwordRef.current.value,
                dateOfBirth: dobRef.current.value,
                address: addressRef.current.value,
            },
        });
    }

    const FormInput = (props) => (
        <div className="row">
            <label>{props.description}</label>
            <input ref={props.reference} type={props.type} placeholder={props.placeholder}/>
        </div>
    );
    const FormHeader = (props) => (
        <h2 id="headerTitle">{props.title}</h2>
    );

    const PasswordInput = (props) => (
        <div className="row">
            <label>{props.description}</label>
            <input ref={props.reference} type={passwordShown ? 'text' : 'password'} placeholder={props.placeholder}/>

        </div>
    );


    const Form = (props) => (
        <div>
            <FormInput reference={firstNameRef} description="First Name" placeholder="First Name" type="text" />
            <FormInput reference={lastNameRef} description="Last Name" placeholder="Last Name" type="text" />
            <FormInput reference={emailRef} description="Email address" placeholder="Email" type="text" />
            <FormInput reference={confirmEmailRef} description="Confirm email address" placeholder="Confirm your email" type="text" />
            <PasswordInput reference={passwordRef} description="Password" placeholder="Enter your password" type="password"/>
            <PasswordInput reference={confirmPasswordRef} description="Confirm password" placeholder="Confirm your password" type="password"/>
            <button className="password-button" onClick={togglePassword}>{passwordShown ? 'Hide' : 'Show'}</button>
            <FormInput reference={phoneRef} description="Phone number" placeholder="Phone number" type="text" />
            <FormInput reference={dobRef} description="Date of birth" placeholder="Date of birth" type="date" />
            <FormInput reference={addressRef} description="Address" placeholder="Address" type="text" />
            <FormButton title="Register"/>
            {errorMessage && <div className="error"> {errorMessage} </div>}
        </div>
    );

    const FormButton = props => (
        <div id="button" className="row">
            <button onClick={handleRegister}>{props.title}</button>
        </div>
    );



    const LoginOption = props => (
        <div id="login-form">
            <p>Already have an account?</p>
            <Link to="/login"><p>Login now!</p></Link>
        </div>
    );


    return(

        <div id="loginform">
            <FormHeader title="Register" />
            <Form email={email} password={password}/>
            <LoginOption />
            <Modal show={modalVisible} name={firstName}/>
        </div>
    )
}


