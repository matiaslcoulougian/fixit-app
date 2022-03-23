import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {REGISTER} from "../queries/mutations";
import {useMutation} from "@apollo/client";
import './Register.css'
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

    const [errorMessage, setErrorMessage] = useState('');

    const [register] = useMutation(
        REGISTER,
        {
            onCompleted: async (res) => {
                setErrorMessage('')
            },
            onError: (e) => {
                setErrorMessage(e.message);
            },
        }
    );

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

        {/*<Form>*/}
        {/*    <Form.Group className="mb-3" controlId="formBasicFirstName">*/}
        {/*        <Form.Label>First name</Form.Label>*/}
        {/*        <Form.Control type="text" placeholder="Enter first name" ref="firstNameRef"/>*/}
        {/*    </Form.Group>*/}
        {/*    <Form.Group className="mb-3" controlId="formBasicLastName">*/}
        {/*        <Form.Label>Email address</Form.Label>*/}
        {/*        <Form.Control type="text" placeholder="Enter last name" />*/}
        {/*    </Form.Group>*/}
        {/*    <Form.Group className="mb-3" controlId="formBasicEmail">*/}
        {/*        <Form.Label>Email address</Form.Label>*/}
        {/*        <Form.Control type="email" placeholder="Enter email" />*/}
        {/*    </Form.Group>*/}
        {/*    <Form.Group className="mb-3" controlId="formBasicConfirmEmail">*/}
        {/*        <Form.Label>Confirm email address</Form.Label>*/}
        {/*        <Form.Control type="email" placeholder="Enter email" />*/}
        {/*    </Form.Group>*/}
        {/*    <Form.Group className="mb-3" controlId="formBasicPassword">*/}
        {/*        <Form.Label>Password</Form.Label>*/}
        {/*        <Form.Control type="password" placeholder="Password" />*/}
        {/*    </Form.Group>*/}
        {/*    <button type="submit" onClick={handleRegister}>Register </button>*/}
        {/*</Form>*/}
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
            <input value={password} onChange= {e => setPassword(e.target.value)} type="password" placeholder="Password" />
            <label>
                Confirm password
            </label>
            <input value={confirmPassword} onChange= {e => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" />
            <label>
                Phone number
            </label>
            <input value={phone} onChange= {e => setPhone(e.target.value)} type="text" placeholder="Phone Number" />
            <label>
                Birthday
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
        </div>
    </>
  )
}
