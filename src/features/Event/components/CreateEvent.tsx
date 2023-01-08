// @flow
import * as React from 'react';
import eventService from "../../../services/EventService";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Modal from "react-modal"
import {modalStyles} from "../../../assets/styles/CustomStyles";
import {AuthForms} from "../../Auth/AuthForms";

const Form = styled.form`
    display: flex;
    
    input[type="text"] {
        padding: 12px 20px;
        margin: 8px 0;
        border: 1px solid #ccc;
        border-radius: 4px 0 0 4px;
        width: 100%;
    }
    
    input[type="submit"] {
        background-color: purple;
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
    const [isOpen, setIsOpen] = useState(false)
    // const [registering, setRegistering] = useState(false)

    useEffect(() => {
        let interval = setTimeout(() => {
            if (jwt) {
                clearTimeout(interval)
                createEvent()
                // setRegistering(false)
            }
        }, 500)
    }, [isOpen])

    function closeModal() {
        setIsOpen(false);
    }

    const handleSubmit = (e: Event) => {
        e.preventDefault();

        // setRegistering(true);

        createEvent();
    }

    const createEvent = async () => {
        if (!jwt) {
            return setIsOpen(true)
        }

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
        <>
            <Form onSubmit={handleSubmit as any}>
                <input type="text" id="title" name="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
                <input type="submit" value="Create" />
            </Form>

            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="Auth Modal"
            >
                <AuthForms closeModal={closeModal} startTab={2} />
            </Modal>
        </>
    );
};
