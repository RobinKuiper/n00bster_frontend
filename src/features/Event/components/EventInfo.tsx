// @flow
import * as React from 'react';
import Event from '../../../types/Event';

type Props = {
    event: Event;
};
export const EventInfo = ({ event }: Props) => {
    return (
        <div>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
        </div>
    );
};
