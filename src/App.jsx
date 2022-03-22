import React, {useState} from 'react'
import { Login } from './pages/Login'
import { Routes, Route} from 'react-router-dom';
import { Register } from './pages/Register';
import './App.css'
import { Home } from './pages/Home';
import AlertComponent from "./components/alertComponent/Alert";

export function App() {
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <div>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register showError={updateErrorMessage}/>} />
            </Routes>
        <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
    </div>
  )
}
