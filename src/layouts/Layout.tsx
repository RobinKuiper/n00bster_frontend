import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  position: relative;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #173753;
  color: #fff;
  height: 50px;
`;

const SiteName = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const MenuItem = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-right: 20px;
  &:hover {
    color: #6daedb;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const Content = styled.div`
  padding: 20px;
  background-color: #fff;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #1b4353;
  color: #fff;
  text-align: center;
  padding: 20px;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <TopBar>
        <SiteName>My Site</SiteName>
        <Menu>
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/about">About</MenuItem>
        </Menu>
        <UserMenu>
          <MenuItem to="/login">Login</MenuItem>
        </UserMenu>
      </TopBar>
      <Content>{children}</Content>
      <Footer>Copyright 2021</Footer>
    </Container>
  );
};

export default Layout;
