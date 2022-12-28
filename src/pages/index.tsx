import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import Login from '../components/Login';
import Layout from '../layouts/NoAuthLayout';
import { AuthProvider } from '../context/AuthContext';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <AuthProvider>
      <Layout>
        <Login />
      </Layout>
    </AuthProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
