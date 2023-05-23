import React, {useState} from 'react';
import './navbar.css';
import Logo from '../../assets/img/bebra.png';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";

const Navbar = () => {
    const [menuToggle, setMenuToggle] = useState(false);
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        setMenuToggle(!menuToggle);
    }

    return (
        <div className="container">
            <nav id="navbar">
                <div className="nav-wrapper">
                    <div className="logo">
                        <NavLink to="/">
                            <img src={Logo} alt="logo" width="50px" height="50px" className="navbar__logo" />
                        </NavLink>
                    </div>
                    <div className="navbar__header"><NavLink to="/">CLOUD STORAGE</NavLink></div>
                    <div className="menu">
                        {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div> }
                        {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div> }
                        {isAuth && <div className="navbar__login" onClick={() => dispatch(logout())}>Выйти</div> }
                    </div>
                </div>
            </nav>

            <div className="menuIcon">
                <span className="icon icon-bars"></span>
                <span className="icon icon-bars overlay"></span>
            </div>
            {toggleMenu && <div className="overlay-menu" onClick={() => setMenuToggle(true)}>
                <ul>
                    <li><NavLink to="/">Главная</NavLink></li>
                    {!isAuth && <li><NavLink to="/login">Войти</NavLink></li>}
                    {!isAuth && <li><NavLink to="/registration">Регистрация</NavLink></li>}
                    {isAuth && <li onClick={() => dispatch(logout())}>Выйти</li>}
                </ul>
            </div>
            }
        </div>
    );
};

export default Navbar;