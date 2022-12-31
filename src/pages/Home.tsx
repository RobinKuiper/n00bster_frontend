import {AuthContext} from "../context/AuthContext";
import {useContext, useEffect, useState} from "react";
import {createEvent} from "../services/EventService";
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import {EventContext} from "../context/EventContext";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: radial-gradient(circle, rgba(2,0,36,1) 40%, rgba(35,25,94,1) 75%, rgba(74,56,164,1) 100%);
    color: white;
    font-family: arial, serif;
`

const Heading = styled.h1`
    text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
`

const Form = styled.form`
    display: flex;
    
    input[type="text"] {
        padding: 12px 20px;
        margin: 8px 0;
        border: 1px solid #ccc;
        border-radius: 4px 0 0 4px;
    }
    
    input[type="submit"] {
        background-color: #4caf50;
        color: white;
        padding: 12px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 0 4px 4px 0;
        cursor: pointer;
    
        &:hover {
            background-color: #45a049;
        }
    }
`

export default function Home() {
    const { jwt, isLoggedIn } = useContext(AuthContext);
    const { setEvent } = useContext(EventContext);
    const [title, setTitle] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn) navigate('/events');
    }, [isLoggedIn]);


    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        let data = {
            title,
        }

        if (jwt) {
            let event = await createEvent(jwt, data);

            if(event){
                setEvent(event);
                navigate('/event/' + event.identifier);
            }
        }
    }

    return (
        <Container>
            <div>
                <Heading>Create an Event...</Heading>
                <div>
                    <Form onSubmit={handleSubmit as any}>
                        <input type="text" id="title" name="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
                        <input type="submit" value="Create" />
                    </Form>
                </div>
            </div>
        </Container>
    );
}
