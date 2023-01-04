import {AuthContext} from "../context/AuthContext";
import {useContext, useEffect} from "react";
import {EventContext} from "../context/EventContext";
import eventService from "../services/EventService";
import {Layout} from "../layouts/Layout";
import {Link} from "react-router-dom";
import {GridCell, GridContainer} from "../assets/styles/Containers";
import {CreateEvent} from "../features/Event/components/CreateEvent";

export default function Events() {
    const { jwt } = useContext(AuthContext);
    const { events, ownedEvents, setEvents, setOwnedEvents } = useContext(EventContext);

    useEffect(() => {
        if(jwt && events.length <= 0) {
            eventService.getAllEvents(jwt).then(events => {
                setEvents(events.events)
                setOwnedEvents(events.owned)
            });
        }
    }, [jwt]);

    return (
        <Layout>
            {/*<FullCentered>*/}
                <GridContainer>
                    <GridCell area='1 / 1 / 2 / 3'>
                        <CreateEvent />
                    </GridCell>
                    <GridCell area='2 / 1 / 3 / 2'>
                        <h5>Events</h5>
                        <ul>
                            {events.map(event => (
                                <li key={event.identifier}><Link to={`/event/${event.identifier}`}>{event.title}</Link></li>
                            ))}
                        </ul>
                    </GridCell>
                    <GridCell area='2 / 2 / 3 / 3'>
                        <h5>Owned Events</h5>
                        <ul>
                            {ownedEvents.map(event => (
                                <li key={event.identifier}><Link to={`/event/${event.identifier}`}>{event.title}</Link></li>
                            ))}
                        </ul>
                    </GridCell>
                </GridContainer>
            {/*</FullCentered>*/}
        </Layout>
    );
}
