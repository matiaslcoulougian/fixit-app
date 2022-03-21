import React, { useState, useRef } from 'react'
import {Link} from 'react-router-dom'

export function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDoB] = useState('');
    const [address, setAddress] = useState('');

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();
    const dobRef = useRef();
    const addressRef = useRef();
    const confEmailRef = useRef();
    const confPasswordRef = useRef();




    const handleRegister = () => {
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const phone = phoneRef.current.value;
        const dob = dobRef.current.value;
        const address = addressRef.current.value;
        const confEmail = confEmailRef.current.value;
        const confPassword = confPasswordRef.current.value;

        if(firstName === '' || lastName === '' || email === '' || password === '' || phone === '' || 
        dob === '' || address === '' || confEmail === '' || confPassword === '' || email !== confEmail || password || confPassword) return;
        //todo: armar mensaje de error

        //todo: hablar con mati para ver como hacer esto.

    };


  return (
    <div className='column-input'>
        <h1 className='app-title'>PoolMe</h1>
        <input ref={firstNameRef} type="text" placeholder="First Name" />
        <input ref={lastNameRef} type="text" placeholder="Last Name" />
        <input ref={emailRef} type="text" placeholder="Email" />
        <input ref={confEmailRef} type="text" placeholder="Confirm Email" />
        <input ref={passwordRef} type="text" placeholder="Password" />
        <input ref={confPasswordRef} type="text" placeholder="Confirm Password" />
        <input ref={phoneRef} type="text" placeholder="Phone Number" />
        <input ref={dobRef} type="date" placeholder="Date Of Birth" />
        <input ref={addressRef} type="text" placeholder="Address" />
        
        
        <button onClick={handleRegister}>Register</button>
        <p>Already have an account? </p>
        <Link to="/login"><p>Log in now!</p>
        </Link>
        
    </div>
  )
}
