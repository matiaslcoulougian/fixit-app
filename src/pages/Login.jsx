import React, { useState, useRef } from 'react'


export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleEmail = () => {
        const emailText = emailRef.current.value;
        if(emailText === '') return;
        setEmail(emailText);
    }
    

    const handlePassword = () => {
        const passwordText = passwordRef.current.value;
        if(passwordText === '') return;
        setPassword(passwordText);
    }

    const handleLogin = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if(email === '' || password === '') return;
        //todo: hablar con mati para ver como hacer esto.
    }



  return (
    <div className='column-input'>
        <h1 className='app-title'>PoolMe</h1>
        <input ref={emailRef} type="text" placeholder="Email" />
        <input ref={passwordRef} type="text" placeholder="Password" />
        <button>Login</button>
        <p>Don't have an account? </p>
        
    </div>
  )
}
