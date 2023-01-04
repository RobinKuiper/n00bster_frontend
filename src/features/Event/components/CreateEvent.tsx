// @flow
import * as React from 'react';
import eventService from "../../../services/EventService";
import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

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

export const CreateEvent = () => {
    const { jwt, login } = useContext(AuthContext);
    const [title, setTitle] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        let data = {
            title,
        }

        let event = await eventService.createEvent(jwt, data);

        if(event){
            if(event.jwt) {
                let jwt = event.jwt;
                event = event.event;

                if (jwt) login(jwt);
            }
            // event.isOwner = userId === event.owner.id
            // console.log(event);
            // setEvent(event);
            navigate('/event/' + event.identifier);
        }

    }

    return (
        <Form onSubmit={handleSubmit as any}>
            <input type="text" id="title" name="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
            <input type="submit" value="Create" />
        </Form>
    );
};