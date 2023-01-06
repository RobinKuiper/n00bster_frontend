import {AuthContext} from "../context/AuthContext";
import {useContext, useEffect} from "react";
import {EventContext} from "../context/EventContext";
import eventService from "../services/EventService";
import {useParams} from "react-router-dom";
import {Calendar} from "../features/Event/components/Calendar";
import {EventInfo} from "../features/Event/components/EventInfo";
import {Necessities} from "../features/Event/components/Necessities";
import { Members } from "../features/Event/components/Members";
import {Layout} from "../layouts/Layout";
import {LoadingContext} from "../context/LoadingContext";
import {GridCell, GridContainer} from "../assets/styles/Containers";
import {PickedDates} from "../features/Event/components/PickedDates";

export default function Event() {
    const { identifier = '' } = useParams()
    const { jwt, userId } = useContext(AuthContext);
    const { event, setEvent } = useContext(EventContext);
    const { loading, setLoading } = useContext(LoadingContext);

    useEffect(() => {
        setLoading(true);
        if(!event || event.identifier !== identifier) {
            if(jwt) {
                eventService.getEvent(jwt, identifier).then(event => {
                    if(event){
                        event.isOwner = userId === event.owner.id
                        setEvent(event)
                        setLoading(false);
                    } else {
                        eventService.joinEvent(jwt, identifier).then((event) => {
                            event.isOwner = userId === event.owner.id
                            setEvent(event)
                            setLoading(false);
                        })
                    }
                }).catch((err) => console.log(err));
            }
        }
        setLoading(false);
    }, [jwt]);

    return (
        <Layout>
            {!loading && event ? (
                <GridContainer>
                    <GridCell area='1 / 1 / 3 / 2'>
                        <Calendar />
                    </GridCell>
                    <GridCell area='1 / 2 / 2 / 4'>
                        <EventInfo />
                    </GridCell>
                    <GridCell area='2 / 2 / 3 / 3'>
                        <Necessities />
                    </GridCell>
                    <GridCell area='2 / 3 / 3 / 4'>
                        <Members />
                    </GridCell>
                    <GridCell area='3 / 1 / 4 / 2'>
                        <PickedDates />
                    </GridCell>
                </GridContainer>
            ) : (
                  <h1>Loading...</h1>
            )}
        </Layout>
    );
}
