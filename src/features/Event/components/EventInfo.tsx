// @flow
import * as React from 'react';
import {useContext, useEffect} from "react";
import {EventContext} from "../../../context/EventContext";
import {Flex} from "../../../layouts/Components/StyledComponents";
import {AvatarList} from "../../../layouts/Components/AvatarList";

export const EventInfo = () => {
    const { event } = useContext(EventContext);

    useEffect(() => {
        // @ts-ignore
        event?.members.push(event.owner)
    }, [event]);


    return (
        <div>
            {event && (
                <Flex direction={'row'} gap={'20px'}>
                    <div>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                    </div>

                    <AvatarList members={event.members} marginRight={'-20px'} size={'medium'} tooltipPosition={'bottom'} />
                </Flex>
            )}
        </div>
    );
};
