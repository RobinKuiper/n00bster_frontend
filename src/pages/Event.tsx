import {AuthContext} from "../context/AuthContext";
import {useContext, useEffect} from "react";
import {EventContext} from "../context/EventContext";
import eventService from "../services/EventService";
import {useParams} from "react-router-dom";
import {Calendar} from "../features/Event/components/Calendar";
import {EventInfo} from "../features/Event/components/EventInfo";
import {Necessities} from "../features/Event/components/Necessities";
import {Layout} from "../layouts/Layout";
import {LoadingContext} from "../context/LoadingContext";
import {GridCell, GridContainer} from "../assets/styles/Containers";
import {PickedDates} from "../features/Event/components/PickedDates";
import socketIOClient from "socket.io-client";
import User from "../types/User";
import Necessity from "../types/Necessity";
import {Loader} from "../layouts/Components/Loader";
import { Notification } from '../layouts/Components/StyledComponents'

export default function Event() {
    const { identifier = '' } = useParams()
    const { jwt, userId, displayName } = useContext(AuthContext);
    const { event, setEvent, allowedDates, setAllPickedDates, setAllowedDates, setNecessities, setUsersPickedDates } = useContext(EventContext);
    const { loading, setLoading } = useContext(LoadingContext);

    // Get event if we don't have it yet.
    useEffect(() => {
        if(!event || event.identifier !== identifier) {
            setLoading(true);
            setAllPickedDates([])
            setAllowedDates([])
            setNecessities([])
            setUsersPickedDates([])
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
        // @ts-ignore
    }, [identifier, jwt]);

    useEffect(() => {
        if(event) {
            const socket = socketIOClient('localhost:8081', {
                extraHeaders: {
                    Authorization: 'Bearer ' + jwt,
                    User: displayName,
                    'X-room': event.identifier
                }
            });

            socket.on('connect', () => {
                console.log("Socket connected")
            });

            socket.on('disconnect', () => {
                console.log("Socket Disconnected")
            });

            socket.on('message', () => {
                console.log("Pong received")
            });

            socket.on('date_picked', (date) => {
                setAllPickedDates((dates: Array<{ user: User, date: string}>) => [...dates, date])
            });

            socket.on('date_unpicked', (date) => {
                setAllPickedDates((dates: Array<{ user: User, date: string}>) =>
                    dates.filter((d) =>
                        !(d.date === date.date && d.user.username === date.user.username) ));
            });

            socket.on('date_added', (date) => {
                setAllowedDates((dates: Array<string>) => [...dates, date])
            });

            socket.on('date_removed', (date) => {
                setAllowedDates((dates: Array<string>) => dates.filter(d => d !== date))
            });

            socket.on('necessity_added', (necessity) => {
                setNecessities((necessities: Array<Necessity>) => [...necessities, necessity])
            });

            socket.on('necessity_removed', (necessity) => {
                setNecessities((necessities: Array<Necessity>) => necessities.filter(n => n.id !== necessity))
            });

            return () => {
                socket.off('connect');
                socket.off('disconnect');
                socket.off('pong');
                socket.close();
            };
        }
    }, [event])

    return (
        <Layout>
            { allowedDates.length === 0 && <Notification type={'warning'}>Do not forget to pick some dates that other people can choose from.</Notification> }
            {!loading && event ? (
                <GridContainer columns={'auto minmax(0, 1fr)'} rows={'auto auto minmax(0, 1fr)'}>
                    <GridCell area='1 / 1 / 1 / 3' border='none'>
                        <EventInfo />
                    </GridCell>
                    <GridCell area='2 / 1 / 3 / 2' smallArea='2 / 1 / 2 / 4' border='none'>
                        <Calendar />
                    </GridCell>
                    <GridCell area='2 / 2 / 4 / 3' smallArea='3 / 1 / 3 / 4' border='none'>
                        <Necessities />
                    </GridCell>
                    {/*<GridCell area='2 / 3 / 4 / 4' smallArea='4 / 1 / 4 / 4' border='none'>*/}
                    {/*    <Members />*/}
                    {/*</GridCell>*/}
                    <GridCell area='3 / 1 / 4 / 2' smallArea='5 / 1 / 5 / 4' border='none'>
                        <PickedDates />
                    </GridCell>
                </GridContainer>
            ) : (
                  <Loader />
            )}
        </Layout>
    );
}
