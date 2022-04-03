import React from 'react'
import LoginPage from './pages/LoginPage'
import { Routes, Route} from 'react-router-dom';
import './App.css'
import { LandingPage } from './pages/LandingPage';
import RegisterPage from "./pages/RegisterPage";
import { HomePage } from './pages/HomePage';
import {Test} from "./components/Test";
import {DashboardPage} from "./pages/DashboardPage";

export function App() {
  return (
    <div className="main-app">
            <Routes>
                <Route exact path="/" element={<LandingPage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/register" element={<RegisterPage />} />
                <Route exact path="/home" element={<HomePage />} />
                <Route exact path="/test" element={<Test />} />
                <Route exact path="/dashboard" element={<DashboardPage />} />
            </Routes>
    </div>
  )
}
