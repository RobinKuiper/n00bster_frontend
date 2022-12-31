import {AuthContext} from "../context/AuthContext";
import {useContext, useEffect} from "react";
import {EventContext} from "../context/EventContext";
import {getAllEvents} from "../services/EventService";
import {Layout} from "../layouts/Layout";
import {Link} from "react-router-dom";

export default function Events() {
    const { jwt } = useContext(AuthContext);
    const { events, setEvents } = useContext(EventContext);

    useEffect(() => {
        if(jwt) {
            getAllEvents(jwt).then(events => setEvents(events));
        }
    }, [jwt]);

    return (
        <Layout>
            <ul>
                {events.map(event => (
                    <li><Link to={`/event/${event.identifier}`}>{event.title}</Link></li>
                ))}
            </ul>
        </Layout>
    );
}
