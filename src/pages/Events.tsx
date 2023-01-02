import {AuthContext} from "../context/AuthContext";
import {useContext, useEffect} from "react";
import {EventContext} from "../context/EventContext";
import {getAllEvents} from "../services/EventService";
import {Layout} from "../layouts/Layout";
import {Link} from "react-router-dom";
import {FullCentered, GridCell, GridContainer} from "../assets/styles/Containers";

export default function Events() {
    const { jwt } = useContext(AuthContext);
    const { events, ownedEvents, setEvents, setOwnedEvents } = useContext(EventContext);

    useEffect(() => {
        if(jwt) {
            getAllEvents(jwt).then(events => {
                setEvents(events.events)
                setOwnedEvents(events.owned)
            });
        }
    }, [jwt]);

    return (
        <Layout>
            <FullCentered>
                <GridContainer>
                    <GridCell area='1 / 1 / 2 / 2'>
                        <h5>Events</h5>
                        <ul>
                            {events.map(event => (
                                <li><Link to={`/event/${event.identifier}`}>{event.title}</Link></li>
                            ))}
                        </ul>
                    </GridCell>
                    <GridCell area='1 / 2 / 2 / 3'>
                        <h5>Owned Events</h5>
                        <ul>
                            {ownedEvents.map(event => (
                                <li><Link to={`/event/${event.identifier}`}>{event.title}</Link></li>
                            ))}
                        </ul>
                    </GridCell>
                </GridContainer>
            </FullCentered>
        </Layout>
    );
}
