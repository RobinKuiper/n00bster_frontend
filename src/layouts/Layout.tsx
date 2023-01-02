// @flow 
import * as React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

const Container = styled.div`

`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: #333;
  color: white;
  padding: 0 20px;
  margin-bottom: 20px;
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
    return (
        <Container>
            <TopBar>
                <Title>n00bsters</Title>
                <Menu>
                    {routes.map(item => (
                        <MenuItem key={item.path} to={item.path}>{item.title}</MenuItem>
                    ))}
                </Menu>
                <LogoutButton>Logout</LogoutButton>
            </TopBar>

            <Content>
                {children}
            </Content>
        </Container>
    );
};
