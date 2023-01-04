// @flow
import * as React from 'react';
import styled from "styled-components";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import authService from "../../services/AuthService";

const Form = styled.form`
    display: flex;
    
    input[type="text"], input[type="password"] {
        padding: 12px 20px;
        margin: 8px 0;
        border: 1px solid #ccc;
        border-radius: 4px 0 0 4px;
    }
    
    input[type="submit"] {
        background-color: #4caf50;
        color: white;
        padding: 12px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 0 4px 4px 0;
        cursor: pointer;
    
        &:hover {
            background-color: #45a049;
        }
    }
`
export const RegisterForm = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        let data = {
            username,
            password
        }

        let jwt = await authService.register(data);

        if(jwt){
            login(jwt);
            navigate('/events');
        }
    }

    return (
        <Form onSubmit={handleSubmit as any}>
            <input type='text' name='username' placeholder={'Username'} onChange={(e) => setUsername(e.target.value)} />
            <input type='password' name='password' placeholder={'Password'} onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="Register" />
        </Form>
    );
};
