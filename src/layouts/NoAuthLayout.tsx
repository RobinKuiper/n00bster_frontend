import { PageProps } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  position: relative;
`;

const Layout: React.FC<PageProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;
