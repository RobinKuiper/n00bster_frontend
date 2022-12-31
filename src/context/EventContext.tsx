import React, { createContext, useState } from 'react';
import Event from '../types/Event';

interface EventContextData {
  event: Event|null;
  events: Event[]|[];
  setEvent: (event: Event|null) => void;
  setEvents: (events: Event[]|[]) => void;
}

const EventContext = createContext<EventContextData>({
  event: null,
  events: [],
  setEvent: () => {},
  setEvents: () => {},
});

interface Props {
  children: React.ReactNode;
}

const EventProvider: React.FC<Props> = ({ children }: Props) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]|[]>([]);

  return (
    <EventContext.Provider value={{ event, events, setEvent, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export { EventContext, EventProvider };
