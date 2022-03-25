import React from 'react'
import LoginPage from './pages/LoginPage'
import { Routes, Route} from 'react-router-dom';
import './App.css'
import { LandingPage } from './pages/LandingPage';
import RegisterPage from "./pages/RegisterPage";

export function App() {
  return (
    <div>
            <Routes>
                <Route exact path="/" element={<LandingPage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/register" element={<RegisterPage />} />
            </Routes>
    </div>
  )
}
