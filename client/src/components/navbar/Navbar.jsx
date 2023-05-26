import React, {useEffect, useState} from 'react';
import './navbar.css';
import Logo from '../../assets/img/logo_cloud.jpg';
import {NavLink, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import avatarLogo from '../../assets/img/avatar.svg';
import {API_URL} from "../../config";
import {showLoader} from "../../reducers/appReducer";
import {getFiles, searchFiles} from "../../actions/file";
import TextField from "@mui/material/TextField";

const Navbar = () => {
    const location = useLocation();
    const [menuToggle, setMenuToggle] = useState(false);
    const isAuth = useSelector(state => state.user.isAuth);
    const [isSearch, setIsSearch] = useState(false)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

    const toggleMenu = () => {
        setMenuToggle(!menuToggle);
    }

    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if(e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    useEffect(() => {
        if (location.pathname !== '/profile') {
            setIsSearch(true)
        } else {
            setIsSearch(false)
        }
    }, [location])

    return (
        <div className="container">
            <nav id="navbar">
                <div className="nav-wrapper">
                    <div className="logo">
                        <NavLink to="/">
                            <img src={Logo} alt="logo" width="70px" height="70px" className="navbar__logo" />
                        </NavLink>
                    </div>
                    <div className="navbar__header"><NavLink to="/">CLOUD STORAGE</NavLink></div>
                    {isAuth ?
                        <div className="menu auth">
                            {isSearch &&
                            <div className="navbar__search">
                                <TextField
                                    id="standard-search"
                                    label="Название файла..."
                                    type="search"
                                    variant="standard"
                                    value={searchName}
                                    onChange={searchChangeHandler}
                                />
                            </div>}
                            <div className="navbar__login" onClick={() => dispatch(logout())}><NavLink to="/login">Выйти</NavLink></div>
                            <NavLink to="/profile">
                                <img className="navbar__avatar" src={avatar} alt="" />
                            </NavLink>
                        </div>
                    :
                        <div className="menu no-auth">
                            <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>
                            <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>
                        </div>}
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