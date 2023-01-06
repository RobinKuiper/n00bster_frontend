// @flow
import * as React from 'react';
import styled from "styled-components";
import {useContext, useEffect, useState} from "react";
import {EventContext} from "../../../context/EventContext";
import necessityService from "../../../services/NecessityService";
import {AuthContext} from "../../../context/AuthContext";
import Necessity from "../../../types/Necessity";

const Input = styled.input`
  padding: 5px;
  border-radius: 4px 0 0 4px;
  border: 1px solid lightgray;
`

const Button = styled.button`
  padding: 5px;
  border-radius: 0 4px 4px 0;
  border: 1px solid lightgray;

`

export const Necessities = () => {
    const [title, setTitle] = useState("");
    const { event, necessities, setNecessities } = useContext(EventContext);
    const { jwt, userId } = useContext(AuthContext);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();

        if (jwt && event) {
            let data = {
                name: title,
                eventId: event.id,
                amount: 1
            }

            let necessity = await necessityService.addNecessity(jwt, data);

            if(necessity){
                // setNecessities((necessities: Necessity[]) => [...necessities, necessity])
            }
        }
    }

    const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
        let id: number = parseInt(e.currentTarget.getAttribute('data-id') ?? "");

        if(!id) return;

        if(jwt) necessityService.removeNecessity(jwt, id).then(() => {
            // setNecessities((necessities: Necessity[]) => necessities.filter(necessity => necessity.id !== id))
        });
    }

    let items: JSX.Element | JSX.Element[] = <p>Loading...</p>
    if (event) {
        items = necessities.length === 0
            ? <p>Nothing (yet).</p>
            : necessities.map((necessity: Necessity) => (
                <p key={necessity.id}>
                    {necessity.name}
                    {(event.isOwner || necessity.creator.id === userId) && (
                        <button data-id={necessity.id} onClick={handleRemove as any}>x</button>
                    )}
                </p>
            ))
    }

    return (
        <div>
            <h5>Necessities</h5>
            {items}
            <form onSubmit={handleSubmit as any}>
                <Input type='text' name='name' placeholder='New Necessity' value={title} onChange={(e) => setTitle(e.target.value)} />
                <Button type='submit'>+</Button>
            </form>
        </div>
    );
};
