import React, {useState} from 'react';
import "./authorization.css";
import Input from "../../utils/input/Input";
import {registration} from "../../actions/user";
import {useNavigate} from "react-router-dom";

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegistration = (email, password) => {
        registration(email, password).then(r => console.log(r));
        navigate('/login');
    }

    return (
        <div className="authorization">
            <div className="authorization__header">Регистрация</div>
            <div className="authorization__input-wrapper">
                <Input value={email} setValue={setEmail} type="text" label="Введите E-mail..." helperText="example@gmail.com"/>
                <Input value={password} setValue={setPassword} type="password" label="Введите пароль..."/>
            </div>
            <button className="authorization__btn" onClick={() => handleRegistration(email, password)}>Зарегистрироваться</button>
        </div>
    );
};

export default Registration;