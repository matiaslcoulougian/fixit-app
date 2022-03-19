import React from 'react'
import { Login } from './pages/Login'
import { Routes, Route} from 'react-router-dom';
import { Register } from './pages/Register';
import './App.css'
import { Home } from './pages/Home';

export function App() {
  return (
    <div>
        
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
            </Routes>        

    </div>
  )
}
