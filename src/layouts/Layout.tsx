// @flow 
import * as React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import Modal from "react-modal";
import {AuthForms} from "../features/Auth/AuthForms";

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        // marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#24333C',
        border: '1px solid #19242a',
        boxShadow: '0 4px 10px 4px rgba(19,35,47,0.6)'
    },
    overlay: {
        backgroundColor: 'rgba(47,45,45,0.68)'
    },
};

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
                style={customStyles}
                contentLabel="Example Modal"
            >
                <AuthForms closeModal={closeModal} />
            </Modal>
        </Container>
    );
};
