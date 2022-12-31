// @flow
import * as React from 'react';
import Event from '../../../types/Event'

type Props = {
    event: Event;
};
export const Members = ({ event }: Props) => {
    const members = event.members.length === 0
        ? <p>No one (yet).</p>
        : event.members.map(member => (
            <p>{member}</p>
        ))

    return (
        <div>
            <h5>Members</h5>
            {members}
        </div>
    );
};
