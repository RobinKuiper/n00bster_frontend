// @flow 
import * as React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
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
  background-color: #292929;
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

const MenuItem = styled(Link)`
  margin: 0 10px;
  font-size: 14px;
  color: white;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 14px;

  &:hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding-top: 20px;
`

const routes = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'Events',
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
                        <MenuItem key={item.path} to={item.path}>{item.title}</MenuItem>
                    ))}
                </Menu>
                {isLoggedIn ? (
                    <div>
                        <span>{displayName}</span>
                        <LogoutButton onClick={logout}>Logout</LogoutButton>
                    </div>
                ) : (
                    <div>
                        <button onClick={() => setIsOpen(true)}>Login</button>
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
