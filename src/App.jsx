import React from 'react'
import LoginPage from './pages/LoginPage'
import { Routes, Route, Outlet, Navigate} from 'react-router-dom';
import './App.css'
import { LandingPage } from './pages/LandingPage';
import RegisterPage from "./pages/RegisterPage";
import { HomePage } from './pages/HomePage';
import {Test} from "./components/pages/Test";
import {DashboardPage} from "./pages/DashboardPage";
import {JobDetailsPage} from "./pages/JobDetailsPage";
import {MyJobsPage} from "./pages/MyJobsPage";
import {AutocompleteChangeDetails} from "@mui/material";
import ListTest from "./components/pages/ListTest";

const Auth = () => window.localStorage.getItem('token') ? <Outlet/> : <Navigate to={"/"}/>

export function App() {
  return (
    <div className="main-app">

            <Routes>
                <Route exact path="/" element={<LandingPage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/register" element={<RegisterPage />} />

                <Route element={<Auth/>} >
                    <Route exact path="/home" element={<HomePage />} />
                    <Route exact path="/test" element={<Test />} />
                    <Route exact path="/list-test" element={<ListTest />} />
                    <Route exact path="/dashboard" element={<DashboardPage />} />
                    <Route exact path="/job/:jobId" element={<JobDetailsPage />} />
                    <Route exact path="/my-jobs" element={<MyJobsPage />} />
                </Route>



            </Routes>

    </div>
  )
}
