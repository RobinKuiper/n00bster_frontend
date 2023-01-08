// @flow 
import * as React from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import Modal from "react-modal";
import {AuthForms} from "../features/Auth/AuthForms";
import {modalStyles} from "../assets/styles/CustomStyles";
import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

const Container = styled.div`

`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: #24333C;
  color: white;
  padding: 0 20px;
`

const Title = styled.h1`
  font-size: 18px;
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled(NavLink)`
  margin: 0 10px;
  font-size: 1rem;
  color: white;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
  
  &.active {
    font-weight: bold;
  }
`;

const Button = styled.button`
  background-color: #8b4cd7;
  border: none;
  color: white;
  //font-weight: 600;
  //font-size: 1rem;
  padding: 5px 40px;
  margin-left: 10px;

  &:hover {
    background-color: #671cbe;
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding-top: 20px;
`

const routes = [
    // {
    //     title: 'Home',
    //     path: '/'
    // },
    {
        title: 'All Events',
        path: '/events'
    }
]

type Props = {
    children: React.ReactNode;
};
export const Layout = ({children}: Props) => {
    const { isLoggedIn, logout, displayName } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Container>
            <TopBar>
                <Title>n00bsters</Title>
                <Menu>
                    {routes.map(item => (
                        <li key={item.path}>
                            <MenuItem
                                className={({ isActive }) =>
                                    isActive ? 'active' : ''
                                }
                                to={item.path}>
                                {item.title}
                            </MenuItem>
                        </li>
                    ))}
                </Menu>
                {isLoggedIn ? (
                    <div>
                        <MenuItem to={'/profile'}>{displayName}</MenuItem>
                        <Button onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <div>
                        <Button onClick={() => setIsOpen(true)}>Login</Button>
                    </div>
                )}
            </TopBar>

            <Content>
                {children}
            </Content>

            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="Auth Modal"
            >
                <AuthForms closeModal={closeModal} />
            </Modal>

            <ToastContainer />
        </Container>
    );
};
