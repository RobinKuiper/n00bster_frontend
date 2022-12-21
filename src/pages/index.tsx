import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import Login from '../components/Login';
import Layout from '../layouts/NoAuthLayout';

const IndexPage: React.FC<PageProps> = () => {
  const handleLogin = (username: string, password: string) => {
    console.log('Login!');
  };

  return (
    <Layout>
      <>
        <h2>Login</h2>
        <Login onLogin={handleLogin} />
      </>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
