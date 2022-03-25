import React from 'react'
import { Link } from 'react-router-dom';
import carLogo from '../resources/carLogo.png'
import './styles/LandingPage.css'
export function LandingPage() {
  return (
    <div>
        <img src={carLogo} alt="Logo" className="logo"/>
        <h1 className='app-title'>PoolMe</h1>
        <div className='centered' id='buttons'>
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
  )
}
