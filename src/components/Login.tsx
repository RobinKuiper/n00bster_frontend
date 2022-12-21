import * as React from 'react';
import styled from 'styled-components';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 8px;
  margin-bottom: 8px;
`;

const Button = styled.button`
  font-size: 16px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`;

const Login: React.FunctionComponent<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        username:
        <Input type="text" value={username} onChange={handleUsernameChange} />
      </Label>
      <Label>
        password:
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Label>
      <Button type="submit">login</Button>
    </Form>
  );
};

export default Login;
