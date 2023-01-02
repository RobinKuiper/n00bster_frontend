// @flow
import * as React from 'react';
import {useContext} from "react";
import {EventContext} from "../../../context/EventContext";
import User from "../../../types/User";

export const Members = () => {
    const { event } = useContext(EventContext);
    let members: JSX.Element | JSX.Element[] = <p>Loading...</p>

    if (event) {
        members = event.members.length === 0
            ? <p>No one (yet).</p>
            : event.members.map((member: User) => (
                <p key={member.id}>{member.username}</p>
            ))
    }

    return (
        <div>
            <h5>Members</h5>
            {members}
        </div>
    );
};
