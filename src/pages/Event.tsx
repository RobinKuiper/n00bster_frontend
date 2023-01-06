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
import socketIOClient from "socket.io-client";
import {DateObject} from "react-multi-date-picker";
import User from "../types/User";
import Necessity from "../types/Necessity";

export default function Event() {
    const { identifier = '' } = useParams()
    const { jwt, userId, displayName } = useContext(AuthContext);
    const { event, setEvent, setAllPickedDates, setAllowedDates, setNecessities } = useContext(EventContext);
    const { loading, setLoading } = useContext(LoadingContext);

    // Get event if we don't have it yet.
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
