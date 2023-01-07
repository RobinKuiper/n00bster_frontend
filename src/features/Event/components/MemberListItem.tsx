// @flow
import * as React from 'react';
import Event from '../../../types/Event';
import styled from "styled-components";
import { FaTrash } from 'react-icons/fa'
import {ListItem} from "../../../layouts/Components/StyledComponents";
import User from "../../../types/User";

const Button = styled.button`
  background: none;
  color: lightcoral;
  border: none;
`

type Props = {
    member: User;
    event: Event;
};
export const MemberListItem = ({ member, event }: Props) => {
    return (
        <ListItem key={member.id}>
            <span>
                {member.displayName ?? member.username}
            </span>
            <span>
                {(event.isOwner) && (
                    <Button data-id={member.id} onClick={() => {}}><FaTrash /></Button>
                )}
            </span>
        </ListItem>
    );
};
