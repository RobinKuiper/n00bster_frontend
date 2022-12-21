import * as React from 'react';
import type { PageProps } from 'gatsby';
import styled from 'styled-components';

import './styles/reset.css';

const LayoutContainer = styled.div`
  margin: 3rem auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.header`
  padding: 20px;
`;

const Main = styled.main`
  flex-grow: 1;
  padding: 20px;
`;

const Footer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  display: none;
`;

const Layout: React.FC<PageProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header>
        <h1>n00bster</h1>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <p>Copyright 2021</p>
      </Footer>
    </LayoutContainer>
  );
};

export default Layout;
