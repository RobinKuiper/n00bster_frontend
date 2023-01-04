import {AuthContext} from "../context/AuthContext";
import {useContext, useEffect} from "react";
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import {FullCentered} from "../assets/styles/Containers";
import {LoginForm} from "../features/Auth/LoginForm";

const Heading = styled.h1`
    text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
`

const ButtonLink = styled.a`
  border: 1px solid lightgray;
  padding: 4px;
  
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`

export default function Login() {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    // TODO: Middleware?
    useEffect(() => {
        if(isLoggedIn) navigate('/events');
    }, [isLoggedIn]);

    return (
        <FullCentered>
            <div>
                <Heading>Login</Heading>
                <div>
                    <LoginForm />
                    <p>
                        Or <ButtonLink href='/register'>Register</ButtonLink>
                    </p>
                </div>
            </div>
        </FullCentered>
    );
}
