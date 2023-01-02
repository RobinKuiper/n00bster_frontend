// @flow
import * as React from 'react';
import {useContext} from "react";
import {EventContext} from "../../../context/EventContext";

export const EventInfo = () => {
    const { event } = useContext(EventContext);

    return (
        <div>
            {event && (
                <>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                </>
            )}
        </div>
    );
};
