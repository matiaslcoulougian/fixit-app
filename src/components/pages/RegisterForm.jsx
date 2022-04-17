import React, {useEffect, useRef, useState} from "react";
import {useMutation} from "@apollo/client";
import {REGISTER} from "../../queries/mutations";
import {Link, useNavigate} from "react-router-dom";
import Modal from "../RegisterModal";
import "../styles/RegisterForm.css";
import LoaderSpinner from "../LoaderSpinner";



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
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [worker, setWorker] = useState(false);
    const focusDiv = useRef();
    const navigate = useNavigate();

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        focusDiv.current.focus();
    }, [focusDiv]);

    const [register, {loading}] = useMutation(
        REGISTER,
        {
            onCompleted: async (res) => {
                setErrorMessage('');
                setLoaderVisible(false)
                navigate('/login');
            },
            onError: (e) => {
                setErrorMessage(e.message);
            },

        }
    );

    const handleWorkerCheckbox = () => {
        console.log("before", worker);
        setWorker(!worker);
        console.log("after", worker);
    }

    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };

    function handleRegister () {
        console.log(firstName);

        if (firstName === '' || lastName === '' || email === '' || password === '' || phone === '' ||
            dob === '' || address === '' || confirmEmail === '' || confirmPassword === '') {
            setErrorMessage('All fields are required!');
            return;
        }
        else if (email !== confirmEmail) {
            console.log(email, confirmEmail);
            setErrorMessage('Emails should match!');
            return;
        }
        else if (password !== confirmPassword){
            setErrorMessage('Passwords should match!');
            return;
        }
        register({
            variables: {
                firstName: capitalize(firstName),
                lastName: capitalize(lastName),
                email: email,
                phoneNumber: phone,
                password: password,
                dateOfBirth: dob,
                address: address,
                isWorker: worker
            },
        });
        if (loading){
            setLoaderVisible(true);
        }
    }

    const FormHeader = (props) => (
        <h2 id="headerTitle">{props.title}</h2>
    );

    const FormButton = (props) => (
        <div id="button" className="fieldRow">
            <button onClick={handleRegister}>{props.title}</button>
        </div>
    );

    const LoginOption = () => (
        <div id="login-form">
            <p>Already have an account?</p>
            <Link to="/login" className="nav-link"><p>Login now!</p></Link>
        </div>
    );


    return(

        <div id="loginform">
            <FormHeader title="Register" />
            <div>
                <div className="fieldRow">
                    <label>First Name</label>
                    <input ref={focusDiv} value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name"/>
                </div>
                <div className="fieldRow">
                    <label>Last Name</label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name"/>
                </div>

                <div className="checkbox">
                 <div>
                     <label>Are you a worker?</label>
                     <input className="box" type="checkbox" onChange={handleWorkerCheckbox} value={worker ? "checked": "unchecked"}/>

                 </div>
                {/*<FormControlLabel control={<Checkbox classes={""} defaultChecked />} label="Label" labelPlacement="start"/>*/}
                </div>

                <div className="fieldRow">
                    <label>Email address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email"/>
                </div>
                <div className="fieldRow">
                    <label>Confirm email address</label>
                    <input value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} type="text" placeholder="Confirm your email"/>
                </div>
                <div className="fieldRow">
                    <label>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type={passwordShown ? 'text' : 'password'} placeholder="Enter your password"/>
                </div>
                <div className="fieldRow">
                    <label>Confirm password</label>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={passwordShown ? 'text' : 'password'} placeholder="Confirm your password"/>
                </div>
                <button className="password-button" onClick={togglePassword}>
                    {passwordShown ? 'Hide password' : 'Show password'}
                </button>
                <div className="fieldRow">
                    <label>Phone number</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Phone number"/>
                </div>
                <div className="fieldRow">
                    <label>Date of birth</label>
                    <input value={dob} onChange={(e) => setDoB(e.target.value)} type="date" placeholder="Date of birth" />
                </div>
                <div className="fieldRow">
                    <label>Address</label>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address"/>
                </div>
                {errorMessage && <div className="error"> {errorMessage} </div>}
                <LoaderSpinner show={loaderVisible}/>
                <FormButton title="Register"/>
            </div>
            <LoginOption />
            <Modal show={modalVisible} name={firstName}/>
        </div>
    )
}


