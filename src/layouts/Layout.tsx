// @flow 
import * as React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

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

const LinkButton = styled(Link)`
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
                        <LinkButton to='/login'>Login</LinkButton>
                    </div>
                )}
            </TopBar>

            <Content>
                {children}
            </Content>
        </Container>
    );
};
