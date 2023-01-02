import {AuthContext} from "../context/AuthContext";
import {useContext, useEffect} from "react";
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import {FullCentered} from "../assets/styles/Containers";
import {CreateEvent} from "../features/Event/components/CreateEvent";

const Heading = styled.h1`
    text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
`

export default function Home() {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn) navigate('/events');
    }, [isLoggedIn]);

    return (
        <FullCentered>
            <div>
                <Heading>Create an Event...</Heading>
                <div>
                    <CreateEvent />
                </div>
            </div>
        </FullCentered>
    );
}
