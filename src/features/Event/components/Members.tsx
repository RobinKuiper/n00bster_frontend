// @flow
import * as React from 'react';
import {useContext} from "react";
import {EventContext} from "../../../context/EventContext";
import User from "../../../types/User";
import {MemberListItem} from "./MemberListItem";
import {List, Panel} from "../../../layouts/Components/StyledComponents";

export const Members = () => {
    const { event } = useContext(EventContext);
    let members: JSX.Element | JSX.Element[] = <p>Loading...</p>

    if (event) {
        members = event.members.length === 0
            ? <p>No one (yet).</p>
            : event.members.map((member: User) => (
                <MemberListItem key={member.id} member={member} event={event} />
            ))
    }

    return (
        <Panel>
            <div><h4>Members</h4></div>
            <List>{members}</List>
        </Panel>
    );
};
