import React, { createContext, useState } from 'react';
import Event from '../types/Event';

interface EventContextData {
  event: Event|null;
  events: Event[]|[];
  ownedEvents: Event[]|[];
  setEvent: (event: Event|null) => void;
  setEvents: (events: Event[]|[]) => void;
  setOwnedEvents: (events: Event[]|[]) => void;
}

const EventContext = createContext<EventContextData>({
  event: null,
  events: [],
  ownedEvents: [],
  setEvent: () => {},
  setEvents: () => {},
  setOwnedEvents: () => {},
});

interface Props {
  children: React.ReactNode;
}

const EventProvider: React.FC<Props> = ({ children }: Props) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]|[]>([]);
  const [ownedEvents, setOwnedEvents] = useState<Event[]|[]>([]);

  return (
    <EventContext.Provider value={{ event, events, ownedEvents, setEvent, setEvents, setOwnedEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export { EventContext, EventProvider };
