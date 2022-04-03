import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../resources/logo.png'
import './styles/LandingPage.css'
export function LandingPage() {
  return (
      <div className="big-div">
        <div className='landing'>
        <img src={logo} alt="Logo" className="logo"/>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,900;1,900&display=swap');
        </style>
        <h1 className='app-title'>Fixit</h1>
        <div id='buttons'>
          <Link to="/login"><button>
                Login
              </button>
          </Link>
          <Link to="/register"><button>
                Register
              </button>
          </Link>
        </div>
    </div>
    </div>
  )
}
