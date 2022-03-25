import React, {useState} from "react";
import {Link} from "react-router-dom";

export function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        if(email === '' || password === '') return;
        //todo: hablar con mati para ver como hacer esto.
    }



    return (
        <div className='column-input'>
            <h1 className='app-title'>PoolMe</h1>
            <input value={email} onChange= {e => setEmail(e.target.value)} type="text" placeholder="Email" />
            <input value={password} onChange= {e => setPassword(e.target.value)} type="text" placeholder="Password" />
            <button>Login</button>
            <p>Don't have an account? </p><Link to="/register"><p>Register now!</p>
        </Link>

        </div>
    )

}

