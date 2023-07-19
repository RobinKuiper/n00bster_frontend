import {AuthContext} from "../context/AuthContext";
import {useContext, useEffect, useState} from "react";
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
import {modalStyles} from "../assets/styles/CustomStyles";
import {AuthForms} from "../features/Auth/AuthForms";
import Modal from "react-modal";
import * as React from "react";
import {Members} from "../features/Event/components/Members";

export default function Event2() {
    const { identifier = '' } = useParams()
    const { jwt, userId, displayName } = useContext(AuthContext);
    const { event, setEvent, allowedDates, setAllPickedDates, setAllowedDates, setNecessities, setUsersPickedDates } = useContext(EventContext);
    const { loading, setLoading } = useContext(LoadingContext);
    const [isOpen, setIsOpen] = useState(false)

    // Check if we are logged in
    useEffect(() => {
        if (!jwt) {
            setIsOpen(true)
        }
    }, [jwt]);

    // Get event if we don't have it yet.
    useEffect(() => {
        if(jwt && (!event || event.identifier !== identifier)) {
            setLoading(true);
            setAllPickedDates([])
            setAllowedDates([])
            setNecessities([])
            setUsersPickedDates([])

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
        // @ts-ignore
    }, [identifier, jwt]);

    useEffect(() => {
        if(event) {
            const socket = socketIOClient(process.env.REACT_APP_WS_URL as string, {
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

            socket.on('date_picked', (date) => {
                setAllPickedDates((dates: Array<{ user: User, date: string}>) => [...dates, date])
            });

            socket.on('date_unpicked', (date) => {
                setAllPickedDates((dates: Array<{ user: User, date: string}>) =>
                    dates.filter((d) =>
                        !(d.date === date.date && d.user.email === date.user.email) ));
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

            socket.on('necessity_picked', updateNecessities);

            socket.on('necessity_unpicked', updateNecessities);

            return () => {
                socket.off('connect');
                socket.off('disconnect');
                socket.off('pong');
                socket.close();
            };
        }
    }, [event])

    const closeModal = () => {
        setIsOpen(false)
    }

    const updateNecessities = (newNecessity: Necessity) => {
        setNecessities((necessities: Necessity[]) => necessities.map((n: Necessity) => {
            if (newNecessity.id === n.id) {
                if (!Array.isArray(newNecessity.members)) {
                    // @ts-ignore
                    newNecessity.members = Object.values(newNecessity.members).map((member: User) => member)
                }
                return newNecessity;
            }
            return n;
        }));
    }

    return (
        <>
            {!loading && event ? (
                <GridContainer columns={'0.6fr 2fr 0.7fr 0.7fr'} rows={'auto auto auto'} autoFlow={'row'} templateAreas={
                    '"Header Header Header Header"\n' +
                    '"EventInfo EventInfo EventInfo EventInfo"\n' +
                    '"Members Calendar TopDate Necessities"'}>
                    <GridCell area='Header'>
                        <h1>N00bsters</h1>
                    </GridCell>
                    <GridCell area='EventInfo' border='none'>
                        <EventInfo />
                        { event?.isOwner && allowedDates.length === 0 && <Notification type={'warning'}>Do not forget to pick some dates where other people can choose from.</Notification> }
                        { !event?.isOwner && allowedDates.length === 0 && <Notification type={'info'}>{event?.owner.displayName} has not allowed any dates to be picked yet.</Notification> }
                    </GridCell>
                    <GridCell area='Members' smallArea='4 / 1 / 4 / 4' border='none'>
                        <Members />
                    </GridCell>
                    <GridCell area='Calendar' smallArea='2 / 1 / 2 / 4' border='none'>
                        <Calendar />
                    </GridCell>
                    <GridCell area='Necessities' smallArea='3 / 1 / 3 / 4' border='none'>
                        <Necessities />
                    </GridCell>
                    <GridCell area='TopDate' smallArea='5 / 1 / 5 / 4' border='none'>
                        <PickedDates />
                    </GridCell>
                </GridContainer>
            ) : (
                  <Loader />
            )}
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="Auth Modal"
            >
                <AuthForms closeModal={closeModal} startTab={2} joining={true} />
            </Modal>
        </>
    );
}
