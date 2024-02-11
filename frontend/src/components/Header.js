import logo from '../images/logo.png';
import {Outlet, Link} from "react-router-dom";
import './header.css';

function Logo() {
    return (
        <img src={logo} 
            width={74}
            height={74}
            className="App-logo"
            alt="" />
    )
}

// Header component tutorial: https://www.youtube.com/watch?v=0hKFJr1TA6c
export default function Header() {
    return (
    <>
        <nav>
            <div className='app-header'>
                <div className='header-logo'>
                    <Logo />
                    <Link to="/">OSU Adoption Center</Link>
                </div>
                <div className="header-nav">
                    <a href="/match">Match with Pets</a>
                    <button>Sign Up</button>
                    <button>Log In</button>
                </div>
            </div>
        </nav>

        <Outlet />
    </>
    )
}