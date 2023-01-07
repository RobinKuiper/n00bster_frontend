import {AuthContext} from "../context/AuthContext";
import {useContext, useEffect} from "react";
import {EventContext} from "../context/EventContext";
import eventService from "../services/EventService";
import {Layout} from "../layouts/Layout";
import {GridCell, GridContainer} from "../assets/styles/Containers";
import {CreateEvent} from "../features/Event/components/CreateEvent";
import styled from "styled-components";
import {EventListItem} from "../features/Event/components/EventListItem";
import {List, Panel} from "../layouts/Components/StyledComponents";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const GridCellStyled = styled(GridCell)`
  //background-color: #fff;
  //border-radius: 5px;
  //box-shadow: 2px 2px 3px #000;
`

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
                        <Panel>
                            <h4>Events</h4>
                            {events.length > 0 ? (
                                <List>
                                    {events.map(event => (
                                        <EventListItem key={event.id} event={event} />
                                    ))}
                                </List>
                            ) : (
                                <p>You are not part of any events.</p>
                            )}
                        </Panel>
                    </GridCellStyled>
                    <GridCellStyled area='1 / 2 / 2 / 3'>
                        <Panel>
                            <h4>Owned Events</h4>
                            {ownedEvents.length > 0 ? (
                                <List>
                                    {ownedEvents.map(event => (
                                        <EventListItem key={event.id} event={event} />
                                    ))}
                                </List>
                            ) : (
                                <p>You can create an event below.</p>
                            )}
                        </Panel>
                    </GridCellStyled>
                    <GridCell area='2 / 1 / 3 / 3'>
                        <CreateEvent />
                    </GridCell>
                </GridContainer>
            </Container>
        </Layout>
    );
}
