import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {REGISTER} from "../../queries/mutations";
import {useMutation} from "@apollo/client";
import '../styles/Register.css'
import Modal from "../RegisterModal";

export const Register = () => {
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

        if (firstName === '' || lastName === '' || email === '' || password === '' || phone === '' ||
        dob === '' || address === '' || confirmEmail === '' || confirmPassword === '') {
            setErrorMessage('All fields are required');
            return;
        }
        else if (email !== confirmEmail) {
            setErrorMessage('Emails should match');
            return;
        }
        else if (password !== confirmPassword){
            setErrorMessage('Passwords should match');
            return;
        }
        register({
            variables: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phone,
                password: password,
                dateOfBirth: dob,
                address: address,
            },
        });
    }

  return (
    <>
        <h1 className='app-title'>PoolMe</h1>
        <div className = "column-input">
            <label>
                First name
            </label>
            <input value={firstName} onChange= {e => setFirstName(e.target.value)} type="text" placeholder="First Name" />
            <label>
                Last name
            </label>
            <input value={lastName} onChange= {e => setLastName(e.target.value)} type="text" placeholder="Last Name" />
            <label>
                Email address
            </label>
            <input value={email} onChange= {e => setEmail(e.target.value)} type="text" placeholder="Email" />
            <label>
                Confirm email address
            </label>
            <input value={confirmEmail} onChange= {e => setConfirmEmail(e.target.value)} type="text" placeholder="Confirm Email" />
            <label>
                Password
            </label>
            <input value={password} onChange= {e => setPassword(e.target.value)} type={passwordShown ? "text" : "password"} placeholder="Password" />
            <button onClick={togglePassword}>Show Password</button>
            <label>
                Confirm password
            </label>
            <input value={confirmPassword} onChange= {e => setConfirmPassword(e.target.value)} type={passwordShown ? "text" : "password"} placeholder="Confirm Password" />
            <label>
                Phone number
            </label>
            <input value={phone} onChange= {e => setPhone(e.target.value)} type="text" placeholder="Phone Number" />
            <label>
                Date of Birth
            </label>
            <input value={dob} onChange= {e => setDoB(e.target.value)} type="date" placeholder="Date Of Birth" />
            <label>
                Address
            </label>
            <input value={address} onChange= {e => setAddress(e.target.value)} type="text" placeholder="Address" />
            <button
                type="submit" onClick={handleRegister}>Register
            </button>

            {errorMessage && <div className="error"> {errorMessage} </div>}
            <p>
                Already have an account?
            </p>
            <Link to="/login">
                <p>
                    Log in now!
                </p>
            </Link>
            <Modal show={modalVisible} name={firstName}/>
        </div>
    </>
  )
}
