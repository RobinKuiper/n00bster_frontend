// @flow
import * as React from 'react';
import {useContext} from "react";
import {EventContext} from "../../../context/EventContext";
import {Flex} from "../../../layouts/Components/StyledComponents";
import {Avatar} from "../../../layouts/Components/Avatar";
import User from "../../../types/User";
import styled from "styled-components";

const AvatarList = styled.div`
  margin-left: 50px;
  
  > * {
    margin-right: -20px;
  }
`

export const EventInfo = () => {
    const { event } = useContext(EventContext);

    return (
        <div>
            {event && (
                <Flex direction={'row'}>
                    <div>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                    </div>

                    <AvatarList>
                        { event.members.map((member: User) => (
                            <span key={member.id}><Avatar user={member} size={'medium'} tooltipPosition={'bottom'} /></span>
                        ))}
                    </AvatarList>
                </Flex>
            )}
        </div>
    );
};
