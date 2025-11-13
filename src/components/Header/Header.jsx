import React from 'react';
import {Link, useNavigate} from "react-router";
import './Header.css';

function Header() {

    const isUserLoggedIn = localStorage.getItem('isAuthenticated') === 'true';
    const userString = isUserLoggedIn ? localStorage.getItem('currentUser') : null;
    const currentUser = JSON.parse(userString);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        navigate('/auth');
    }

    return (
        <div className="header-container">
            {
                isUserLoggedIn ?
                    <>
                        <Link to="/user-orders">Мої замовлення</Link>
                        <h1>{currentUser.firstName}</h1>
                        <button type="button" onClick={handleLogout}>Вихід</button>
                    </>
                    : <nav>
                        <Link to="/auth">Вхід</Link>
                        <Link to="/reg">Реєстрація</Link>
                    </nav>
            }
        </div>
    );
}

export default Header;