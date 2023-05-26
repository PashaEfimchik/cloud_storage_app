import React, {useState} from "react";
import "./authorization.css";
import Input from "../../utils/input/Input";
import {useDispatch} from "react-redux";
import {login} from "../../actions/user";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (email, password) => {
        dispatch(login(email, password));
        navigate('/');
    }

    return (
        <div className="authorization">
            <div className="authorization__header">Авторизация</div>
            <div className="authorization__input-wrapper">
                <Input value={email} setValue={setEmail} type="text" label="Введите E-mail..." helperText="example@gmail.com"/>
                <Input value={password} setValue={setPassword} type="password" label="Введите пароль..."/>
            </div>
            <button className="authorization__btn" onClick={() => handleLogin(email,password)}>Войти</button>
        </div>
    );
};

export default Login;