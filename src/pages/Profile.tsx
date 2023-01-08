// @flow 
import * as React from 'react';
import {Layout} from "../layouts/Layout";
import {useContext, useEffect, useState} from "react";
import authService from "../services/AuthService";
import {AuthContext} from "../context/AuthContext";
import User from "../types/User";
import {GridCell, GridContainer} from "../assets/styles/Containers";
import {Flex, Panel} from "../layouts/Components/StyledComponents";
import styled from "styled-components";
import {toast} from "react-toastify";
import {Avatar} from "../layouts/Components/Avatar";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  label {
    font-weight: 700;
    font-size: 0.9rem;
  }

  input[type="text"], input[type="email"], input[type="password"] {
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
    font-size: 1.1rem;
    font-weight: 600;

    &:hover {
      background-color: #671cbe;
    }
  }
`

const Colorpicker = styled(Flex)`
    
`

type ColorProps = {
    color: string;
}
const Color = styled.div<ColorProps>`
  width: 30px;
  height: 30px;
  background-color: ${props => props.color};
  border-radius: 50%;
  border: 1px solid lightgray;
`

const colors = [
    '#8b4cd7',
    '#606f73',
    '#d5375e',
    '#3776d5',
    '#37d564',
    '#d5a837'
]

export const Profile = () => {
    const { jwt } = useContext(AuthContext)
    const [user, setUser] = useState<User>();
    const [isGuest, setIsGuest] = useState<boolean>(true);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');
    const [color, setColor] = useState<string>('');

    useEffect(() => {
        if(jwt) {
            authService.getUserData(jwt).then(user => {
                setUser(user)
                setIsGuest(!user.email)

                setDisplayName(user.displayName)
                setEmail(user.email);
                setColor(user.color);
            });
        }
    }, [jwt]);

    const showToast = () => {
        toast.success('Updated!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    
    const handleUpdateProfile = (e: Event) => {
        e.preventDefault();

        if(!jwt) return;

        const data = {
            displayName,
            color
        }

        authService.updateProfileData(jwt, data).then(() => {
            showToast()
        }).catch(e => {
            console.log(e)
        })
    }

    const handleChangePassword = (e: Event) => {
        e.preventDefault();

        if(!jwt) return;

        const data = {
            password
        }

        authService.updatePassword(jwt, data).then(() => {
            showToast()
        }).catch(e => {
            console.log(e)
        })
    }

    const handleChangeEmail = (e: Event) => {
        e.preventDefault();
    }

    const handleCreateCredentials = (e: Event) => {
        e.preventDefault();

        if(!jwt) return;

        const data = {
            email,
            password
        }

        authService.addCredentials(jwt, data).then(() => {
            showToast()
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <Layout>
            <Container>
                <GridContainer columnGap='50px' columns={isGuest ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'} rows='1fr'>
                    <GridCell area='1 / 1 / 2 / 2'>
                        <Panel>
                            <h4>Change Profile</h4>
                            <Form onSubmit={handleUpdateProfile as any}>
                                <div>
                                    <label htmlFor={'displayName'}>Display Name</label>
                                    <input required id='displayName' type="text" name="displayName" placeholder="Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                                </div>
                                <Flex gap={'20px'} alignItems={'center'}>
                                    {user && <Avatar user={user} size={'medium'} color={color} />}
                                    <Colorpicker direction={'row'} justifyContent={'center'} gap={'10px'}>
                                        {colors.map((color) => (
                                            <Color key={color} color={color} onClick={() => setColor(color)} />
                                        ))}
                                    </Colorpicker>
                                </Flex>
                                <button type={'submit'}>Save</button>
                            </Form>
                        </Panel>
                    </GridCell>
                    {!isGuest ? (
                        <>
                            <GridCell area='1 / 2 / 2 / 3'>
                                <Panel>
                                    <h4>Change Password</h4>
                                    <Form onSubmit={handleChangePassword as any}>
                                        <div>
                                            <label htmlFor={'password'}>Password</label>
                                            <input required id={'password'} type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor={'password2'}>Password</label>
                                            <input required id={'password2'} type="password" name="password2" placeholder="Password Confirmation" onChange={(e) => setPassword2(e.target.value)} />
                                        </div>
                                        <button type={'submit'}>Save</button>
                                    </Form>
                                </Panel>
                            </GridCell>
                            <GridCell area='1 / 3 / 2 / 4'>
                                <Panel>
                                    <h4>Change Email</h4>
                                    <Form onSubmit={handleChangeEmail as any}>
                                        <div>
                                            <label htmlFor={'email'}>Email</label>
                                            <input disabled required id={'email'} type="email" name="email" placeholder="Email" value={user?.email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <button type={'submit'} disabled>Save</button>
                                    </Form>
                                </Panel>
                            </GridCell>
                        </>
                    ) : (
                        <GridCell area='1 / 2 / 2 / 3'>
                            <Panel>
                                <h4>Create Credentials</h4>
                                <Form onSubmit={handleCreateCredentials as any}>
                                    <div>
                                        <label htmlFor={'email'}>Email</label>
                                        <input required id={'email'} type="email" name="email" placeholder="Email" value={user?.email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor={'password'}>Password</label>
                                        <input required id={'password'} type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor={'password2'}>Password</label>
                                        <input required id={'password2'} type="password" name="password2" placeholder="Password Confirmation" onChange={(e) => setPassword2(e.target.value)} />
                                    </div>
                                    <button type={'submit'}>Save</button>
                                </Form>
                            </Panel>
                        </GridCell>
                    )}
                </GridContainer>
            </Container>
        </Layout>
    );
};
