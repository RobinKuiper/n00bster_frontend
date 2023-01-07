// @flow
import * as React from 'react';
import styled from "styled-components";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import authService from "../../services/AuthService";
import {Flex, Notification} from "../../layouts/Components/StyledComponents";
// TODO: Split file
const Container = styled(Flex)`
  color: #fff;

  > * {
    width: 100%;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input[type="text"], input[type="password"] {
    padding: 12px 20px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
    width: 100%;
  }

  button[type="submit"] {
    background-color: #8b4cd7;
    color: white;
    padding: 12px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    font-size: 2rem;
    font-weight: 600;

    &:hover {
      background-color: #671cbe;
    }
  }
`

const Buttons = styled(Flex)`
  button {
    background-color: #435359;
    border: none;
    color: white;
    font-weight: 600;
    font-size: 1.4rem;
    padding: 20px 80px;

    &:hover {
      background-color: #671cbe;
      cursor: pointer;
    }

    &.active, &.active:hover {
      background-color: #8b4cd7;
      cursor: default;
    }
  }
`

const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem
`

const ForgotPass = styled.div`
  text-align: right;
`

type Props = {
    closeModal: Function;
}
export const AuthForms = ({ closeModal }: Props) => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [tab, setTab] = useState(0);
    const [error, setError] = useState('');

    const handleLogin = async (e: Event) => {
        e.preventDefault();
        let data = {
            username,
            password
        }

        let jwt = await authService.login(data).catch(e => {
            setError(e.response.data)
        });

        if(jwt){
            login(jwt);
            // navigate('/events');
            closeModal()
        }
    }

    const handleRegister = async (e: Event) => {
        e.preventDefault();
        let data = {
            username,
            password
        }

        let jwt = await authService.register(data).catch(e => {
            setError(e.response.data)
        });

        if(jwt){
            login(jwt);
            // navigate('/events');
            closeModal()
        }
    }

    const changeTab = (tab: number) => {
        setTab(tab)
        setError('')
    }

    return (
        <Container gap={'30px'}>
            <Buttons direction={'row'} justifyContent={'center'}>
                <button className={tab === 0 ? 'active' : ''} onClick={() => changeTab(0)}>Sign In</button>
                <button className={tab === 1 ? 'active' : ''} onClick={() => changeTab(1)}>Sign Up</button>
            </Buttons>

            {tab === 0 ? (
                <>
                    <Title>Welcome Back!</Title>

                    <Form onSubmit={handleLogin as any}>
                        <label>
                            <input type='text' name='username' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                        </label>
                        <label>
                            <input type='password' name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <ForgotPass>
                            <a>Forgot Password?</a>
                        </ForgotPass>
                        { error !== '' && <Notification type={'error'}>{error}</Notification>}
                        <button type='submit'>SIGN IN</button>
                    </Form>
                </>
            ) : (
                <>
                    <Title>Thanks for joining!</Title>

                    <Form onSubmit={handleRegister as any}>
                        <label>
                            <input type='text' name='username' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                        </label>
                        <label>
                            <input type='password' name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        { error !== '' && <Notification type={'error'}>{error}</Notification>}
                        <button type='submit'>SIGN UP</button>
                    </Form>
                </>
            )}
        </Container>
    );
};
