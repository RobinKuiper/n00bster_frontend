// @flow
import * as React from 'react';
import styled from "styled-components";
import {useContext, useEffect, useState} from "react";
import {EventContext} from "../../../context/EventContext";
import necessityService from "../../../services/NecessityService";
import {AuthContext} from "../../../context/AuthContext";
import Necessity from "../../../types/Necessity";
import {NecessityListItem} from "./NecessityListItem";
import {Flex, Panel} from "../../../layouts/Components/StyledComponents";
import {Loader} from "../../../layouts/Components/Loader";

const NecessityItemContainer = styled(Flex)`
    overflow: hidden;
    
    > * {
      width: 50%;
      
      border-top: 1px solid lightgray;
      border-left: 1px solid lightgray;
      margin-top: -1px;
      margin-left: -1px;
      
      padding: 10px;
    }
`

const Input = styled.input`
  padding: 5px;
  border-radius: 4px 0 0 4px;
  border: 1px solid lightgray;
  width: 100%;
`

const Button = styled.button`
  padding: 5px;
  border-radius: 0 4px 4px 0;
  border: 1px solid lightgray;
`

export const Necessities = () => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const { event, necessities } = useContext(EventContext);
    const { jwt } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true);
        if (event) {
            setLoading(false)
        }
    }, [event])

    const handleSubmit = async (e: Event) => {
        e.preventDefault();

        if (jwt && event) {
            let data = {
                name: title,
                eventId: event.id,
                amount: 1
            }

            await necessityService.addNecessity(jwt, data);

            // if(necessity){
            //     setNecessities((necessities: Necessity[]) => [...necessities, necessity])
            // }
        }
    }

    return (
        <Panel direction={'column'} justifyContent={'center'}>
            <div>
                <h4>Necessities</h4>
            </div>

            {!loading && event ? (
                <>
                    <div>
                        <form onSubmit={handleSubmit as any}>
                            <Flex direction={'row'}>
                                <Input type='text' name='name' placeholder='New Necessity' value={title} onChange={(e) => setTitle(e.target.value)} />
                                <Button type='submit'>+</Button>
                            </Flex>
                        </form>
                    </div>

                    <div>
                        <NecessityItemContainer wrap={'wrap'} direction={'row'}>
                            {necessities.length ? necessities.map((necessity: Necessity) => (
                                <NecessityListItem key={necessity.id} necessity={necessity} event={event} />
                            )) : <div>Nothing (yet).</div>}
                        </NecessityItemContainer>
                    </div>
                </>
            ) : (
                <Loader size={100} />
            )}
        </Panel>
    );
};
