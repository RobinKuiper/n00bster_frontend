// @flow
import * as React from 'react';
import {useContext, useEffect, useState} from "react";
import {EventContext} from "../../../context/EventContext";
import {Flex} from "../../../layouts/Components/StyledComponents";
import {AvatarList} from "../../../layouts/Components/AvatarList";
import {FaEdit} from "react-icons/fa";
import styled from "styled-components";
import eventService from "../../../services/EventService";
import {AuthContext} from "../../../context/AuthContext";

const EditButton = styled.button`
  border: none;

  &:hover {
    color: #743088;
    cursor: pointer;
  }
`

const TitleBar = styled.div`
  width: 50%;
`

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
`

const InlineInput = styled.input`
  border: none;
  border-bottom: 1px solid #000;
  background: none;
  padding: 5px;
  font-size: 1.2rem;
  font-weight: bold;
`

const InlineTextArea = styled.textarea`
  border: none;
  border-bottom: 1px solid #000;
  background: none;
  padding: 5px;
  width: 100%;
  height: 100px;
`

export const EventInfo = () => {
    const { event } = useContext(EventContext);
    const { jwt } = useContext(AuthContext);
    const [editting, setEditting] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (event) {
            setTitle(event.title);
            setDescription(event.description);
        }

        // @ts-ignore
        if (!event.members.includes(event.owner)) {
            // @ts-ignore
            event?.members.push(event.owner)
        }
    }, [event]);

    const handleUpdateEventData = () => {
        if(!jwt || !event) return;

        const data = {
            eventId: event.id,
            title,
            description
        }

        eventService.updateEvent(jwt, data).then(() => {
            event.title = title;
            event.description = description;
            setEditting(false);
        })
    }

    return (
        <div>
            {event && (
                <Flex direction={'row'} gap={'20px'} justifyContent={'space-between'}>
                    <TitleBar>
                        <Flex direction={'row'} gap={'10px'}>
                            {!editting ? <Title>{event.title}</Title> : <InlineInput type={'text'} value={title} onChange={(e) => setTitle(e.target.value)} />}
                            <EditButton onClick={() => setEditting(!editting)}><FaEdit /></EditButton>
                        </Flex>
                        {!editting ? <p>{event.description}</p> : <InlineTextArea onChange={(e) => setDescription(e.target.value)}>{description}</InlineTextArea>}
                        {editting && <button onClick={handleUpdateEventData}>Save</button>}
                    </TitleBar>

                    <AvatarList members={event.members} marginRight={'-20'} size={'medium'} tooltipPosition={'bottom'} />
                </Flex>
            )}
        </div>
    );
};
