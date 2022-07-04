import React from 'react'
import LoginPage from './pages/LoginPage'
import { Routes, Route, Outlet, Navigate} from 'react-router-dom';
import './App.css'
import { LandingPage } from './pages/LandingPage';
import RegisterPage from "./pages/RegisterPage";
import { HomePage } from './pages/HomePage';
import {PaymentForm} from "./components/PaymentForm";
import {DashboardPage} from "./pages/DashboardPage";
import {JobDetailsPage} from "./pages/JobDetailsPage";
import {MyJobsPage} from "./pages/MyJobsPage";
import ListTest from "./components/pages/ListTest";
import HiredPage from "./pages/HiredPage";

const Auth = () => window.localStorage.getItem('token') ? <Outlet/> : <Navigate to={"/"}/>
const ClientAuth = () => {
    if(window.localStorage.getItem('userRole') === "customer"){return <Outlet/>}
    else {
        window.localStorage.clear();
        return <Navigate to={"/"}/>
    }
}
const WorkerAuth = () => {
    if(window.localStorage.getItem('userRole') === "worker"){return <Outlet/>}
    else {
        window.localStorage.clear();
        return <Navigate to={"/"}/>
    }
}


export function App() {
  return (
    <div className="main-app">

            <Routes>
                <Route exact path="/" element={<LandingPage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/register" element={<RegisterPage />} />

                <Route exact path="/test" element={<PaymentForm />} />
                <Route exact path="/list-test" element={<ListTest />} />
                <Route exact path="/job/:jobId" element={<JobDetailsPage />} />

                <Route element={<Auth/>} >
                    <Route element={<ClientAuth/>}>
                        <Route exact path="/home" element={<HomePage />} />
                        <Route exact path="/hired" element={<HiredPage />} />
                    </Route>
                    <Route element={<WorkerAuth/>}>
                        <Route exact path="/dashboard" element={<DashboardPage />} />
                        <Route exact path="/my-jobs" element={<MyJobsPage />} />
                    </Route>

                </Route>



            </Routes>

    </div>
  )
}
