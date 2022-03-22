import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {REGISTER} from "../queries/mutations";
import {useMutation} from "@apollo/client";
import AlertComponent from "../components/alertComponent/Alert";

export function Register(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDoB] = useState('');
    const [address, setAddress] = useState('');

    const [register, {loading, data}] = useMutation(
        REGISTER,
        {
            onCompleted: async (res) => {
                console.log(res);
            },
            onError: (e) => {
                console.log(e)
            },
        }
    );

    function handleRegister () {
        if (firstName === '' || lastName === '' || email === '' || password === '' || phone === '' ||
        dob === '' || address === '' || confirmEmail === '' || confirmPassword === '') {
            props.showError("All fields are required");
        }
        else if (email !== confirmEmail) {
            props.showError("Emails should match");
        }
        else if (password !== confirmPassword){
            props.showError("Passwords should match");
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
    <div className='column-input'>
        <h1 className='app-title'>PoolMe</h1>
        <input value={firstName} onChange= {e => setFirstName(e.target.value)} type="text" placeholder="First Name" />
        <input value={lastName} onChange= {e => setLastName(e.target.value)} type="text" placeholder="Last Name" />
        <input value={email} onChange= {e => setEmail(e.target.value)} type="text" placeholder="Email" />
        <input value={confirmEmail} onChange= {e => setConfirmEmail(e.target.value)} type="text" placeholder="Confirm Email" />
        <input value={password} onChange= {e => setPassword(e.target.value)} type="text" placeholder="Password" />
        <input value={confirmPassword} onChange= {e => setConfirmPassword(e.target.value)} type="text" placeholder="Confirm Password" />
        <input value={phone} onChange= {e => setPhone(e.target.value)} type="text" placeholder="Phone Number" />
        <input value={dob} onChange= {e => setDoB(e.target.value)} type="date" placeholder="Date Of Birth" />
        <input value={address} onChange= {e => setAddress(e.target.value)} type="text" placeholder="Address" />
        
        
        <button type={"submit"} onClick={handleRegister}>Register</button>
        <p>Already have an account? </p>
        <Link to="/login"><p>Log in now!</p>
        </Link>
        
    </div>
  )
}
