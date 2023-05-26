import React from 'react';
import './input.css';
import TextField from '@mui/material/TextField';
const Input = (props) => {
    return (
        <TextField
            onChange={(event) => props.setValue(event.target.value)}
            value={props.value}
            type={props.type}
            label={props.label}
            helperText={props.helperText}
            variant="filled"
        />
    )
};

export default Input;