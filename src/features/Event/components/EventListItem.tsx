// @flow
import * as React from 'react';
import Event from '../../../types/Event';
import {Link} from "react-router-dom";
import styled from "styled-components";

const ListItem = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid lightgrey;
  padding: 15px 10px 15px 10px;

  &:hover {
    background-color: lightgrey;
  }
`;

const Title = styled.div`
  flex: 1;
  font-size: 18px;
  color: purple;
`;

const Owner = styled.div`
  margin-left: auto;
  font-size: 14px;
  color: green;
`;

type Props = {
    event: Event;
};
export const EventListItem = ({ event }: Props) => {
    return (
        <ListItem to={`/event/${event.identifier}`} key={event.identifier}>
            <Title>
                {event.title}
            </Title>

            <Owner>
                {event.owner.displayName ?? event.owner.username}
            </Owner>
        </ListItem>
    );
};
