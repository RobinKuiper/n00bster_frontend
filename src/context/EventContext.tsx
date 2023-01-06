import React, {createContext, useContext, useEffect, useState} from 'react';
import Event from '../types/Event';
import {DateObject} from "react-multi-date-picker";
import dateService from "../services/DateService";
import DateResponse from "../types/DateResponse";
import {AuthContext} from "./AuthContext";
import User from "../types/User";
import Necessity from "../types/Necessity";

interface EventContextData {
  event: Event|null;
  events: Event[]|[];
  ownedEvents: Event[]|[];
  necessities: Necessity[];
  usersPickedDates: string[];
  allowedDates: string[];
  allPickedDates: Array<{ user: User, date: string }>;
  setEvent: (event: Event|null) => void;
  setNecessities: Function;
  setEvents: (events: Event[]|[]) => void;
  setOwnedEvents: (events: Event[]|[]) => void;
  setUsersPickedDates: Function,
  setAllPickedDates: Function,
  setAllowedDates: Function
}

const EventContext = createContext<EventContextData>({
  event: null,
  events: [],
  ownedEvents: [],
  necessities: [],
  usersPickedDates: [],
  allPickedDates: [],
  allowedDates: [],
  setEvent: () => {},
  setNecessities: () => {},
  setEvents: () => {},
  setOwnedEvents: () => {},
  setUsersPickedDates: () => {},
  setAllPickedDates: () => {},
  setAllowedDates: () => {},
});

interface Props {
  children: React.ReactNode;
}

const EventProvider: React.FC<Props> = ({ children }: Props) => {
    const { jwt } = useContext(AuthContext);
    const [event, setEvent] = useState<Event | null>(null);
    const [events, setEvents] = useState<Event[]|[]>([]);
    const [necessities, setNecessities] = useState<Necessity[]>([]);
    const [ownedEvents, setOwnedEvents] = useState<Event[]|[]>([]);
    const [usersPickedDates, setUsersPickedDates] = useState<string[]>([]);
    const [allPickedDates, setAllPickedDates] = useState<Array<{ user: User, date: string }>>([]);
    const [allowedDates, setAllowedDates] = useState<string[]>([]);

    // Get all users picked dates
    useEffect(() => {
        if (event && !event.isOwner && jwt) {
            dateService.getUsersPickedDates(jwt, event.id).then((dates: string[]) => {
                setUsersPickedDates(dates)
            })
        }
    }, [event]);

    // Get all picked dates
    useEffect(() => {
        if(event && jwt) {
            dateService.getAllPickedDates(jwt, event.id).then((dates: Array<{ user: User, date: string }>) => {
                setAllPickedDates(dates)
            })
        }
    }, [event])

    // Set all allowed dates
    useEffect(() => {
        if (event) {
            setAllowedDates(event.dates.map(d => d.date.date.split(' ')[0]))
        }
    }, [event])

    // Set necessities
    useEffect(() => {
        if (event) {
            setNecessities(event.necessities)
        }
    }, [event])

    return (
        <EventContext.Provider value={{
            event,
            events,
            necessities,
            ownedEvents,
            usersPickedDates,
            allPickedDates,
            allowedDates,
            setEvent,
            setEvents,
            setNecessities,
            setOwnedEvents,
            setUsersPickedDates,
            setAllPickedDates,
            setAllowedDates
        }}>
            {children}
        </EventContext.Provider>
    );
};

export { EventContext, EventProvider };
