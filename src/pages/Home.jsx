import React from 'react'
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div>
        <h1 className='app-title'>PoolMe</h1>
        <Link to="/login"><button>
              Login
            </button>
        </Link>
        <Link to="/register"><button>
              Register
            </button>
        </Link>
    </div>
  )
}
