// @flow
import * as React from 'react';
import styled from "styled-components";
import {Flex, ListItem} from "../../../layouts/Components/StyledComponents";
import User from "../../../types/User";
import {AvatarList} from "../../../layouts/Components/AvatarList";

const Date = styled(Flex)<{ color: string; }>`
  font-weight: 700;
  // color: ${props => props.color};
  //text-shadow: -1px 1px 0px rgba(0,0,0,1)
  
  div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
    background: ${props => props.color};
  }
`

type Props = {
    date: string;
    color: string;
    votes: {
        user: User,
        date: string
    }[];
};
export const PickedDateListItem = ({ date, votes, color }: Props) => {
    return (
        <ListItem>
            <Date color={color} direction={'row'}>
                <div></div>
                {date} ({votes.length})
            </Date>
            <AvatarList marginRight={'-10'} members={votes} userKey='user' />
        </ListItem>
    );
};
