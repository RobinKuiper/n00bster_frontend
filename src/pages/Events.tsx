import {AuthContext} from "../context/AuthContext";
import {useContext, useEffect} from "react";
import {EventContext} from "../context/EventContext";
import eventService from "../services/EventService";
import {Layout} from "../layouts/Layout";
import {Link} from "react-router-dom";
import {GridCell, GridContainer} from "../assets/styles/Containers";
import {CreateEvent} from "../features/Event/components/CreateEvent";
import styled from "styled-components";
import {EventListItem} from "../features/Event/components/EventListItem";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const GridCellStyled = styled(GridCell)`
  background-color: #f1f1f1;
  border-radius: 5px;
  box-shadow: 2px 2px 3px #000;
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export default function Events() {
    const { jwt } = useContext(AuthContext);
    const { events, ownedEvents, setEvents, setOwnedEvents } = useContext(EventContext);

    useEffect(() => {
        if(jwt) {
            eventService.getAllEvents(jwt).then(events => {
                setEvents(events.events)
                setOwnedEvents(events.owned)
            });
        }
    }, [jwt]);

    return (
        <Layout>
            <Container>
                <GridContainer columnGap='50px' columns='repeat(2, 1fr)' rows='repeat(2, 1fr)'>
                    <GridCellStyled area='1 / 1 / 2 / 2'>
                        <h3>Events</h3>
                        <List>
                            {events.map(event => (
                                <EventListItem event={event} />
                            ))}
                        </List>
                    </GridCellStyled>
                    <GridCellStyled area='1 / 2 / 2 / 3'>
                        <h3>Owned Events</h3>
                        <List>
                            {ownedEvents.map(event => (
                                <EventListItem event={event} />
                            ))}
                        </List>
                    </GridCellStyled>
                    <GridCell area='2 / 1 / 3 / 3'>
                        <CreateEvent />
                    </GridCell>
                </GridContainer>
            </Container>
        </Layout>
    );
}
