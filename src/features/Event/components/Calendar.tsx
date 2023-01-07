// @flow 
import * as React from 'react';
import {Calendar as DatePicker, DateObject} from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import "react-multi-date-picker/styles/layouts/mobile.css"
// import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import "react-multi-date-picker/styles/colors/purple.css"
import {useContext, useEffect, useState} from "react";
import dateService from "../../../services/DateService";
import {AuthContext} from "../../../context/AuthContext";
import {EventContext} from "../../../context/EventContext";
import { useWindowWidth } from '@react-hook/window-size'

function getDifference(array1: DateObject[], array2: DateObject[]) {
    return array1.filter(object1 => {
        return !array2.some(object2 => {
            return object1.year === object2.year && object1.month.number === object2.month.number && object1.day === object2.day;
        });
    });
}

export const Calendar = () => {
    const width = useWindowWidth();
    const {jwt} = useContext(AuthContext);
    const {event, usersPickedDates, allowedDates} = useContext(EventContext);
    const [calendarAllowedDates, setCalendarAllowedDates] = useState<DateObject[]>([]);
    const [calendarPickedDates, setCalendarPickedDates] = useState<DateObject[]>([]);
    const [numberOfMonths, setNumberOfMonths] = useState<number>(3);

    useEffect(() => {
        if(event) {
            setCalendarAllowedDates(allowedDates.map((date) => new DateObject(date) ));
        }
    }, [allowedDates]);

    useEffect(() => {
        if(!event?.isOwner) {
            setCalendarPickedDates(usersPickedDates.map((date: string) => {
                return new DateObject(date);
            }));
        }
    }, [usersPickedDates]);

    useEffect(() => {
        setNumberOfMonths(width <= 1000 ? 1 : 3);
    }, [width]);


    const handleChange = (newDates: DateObject[]) => {
        if(!event || !jwt) return

        if(event.isOwner) {
            if (newDates.length > calendarAllowedDates.length) {
                let newDate = getDifference(newDates, calendarAllowedDates)[0];
                setCalendarAllowedDates(dates => [...dates, newDate])
                dateService.addDate(jwt, { date: newDate.format(), eventId: event.id });
            } else {
                let removedDate = getDifference(calendarAllowedDates, newDates)[0]
                setCalendarAllowedDates(dates => dates.filter((date: DateObject) => date.toUnix() !== removedDate.toUnix()))
                dateService.removeDate(jwt, { date: removedDate.format(), eventId: event.id })
            }
        } else {

            if (newDates.length > calendarPickedDates.length) {
                let newDate = getDifference(newDates, calendarPickedDates)[0];
                setCalendarPickedDates((dates: DateObject[]) => [...dates, newDate])
                // addDate(jwt, {date: newDate.format(), eventId: event.id});
                dateService.pickDate(jwt, { date: newDate.format(), eventId: event.id })
            } else {
                let removedDate = getDifference(calendarPickedDates, newDates)[0];
                setCalendarPickedDates((dates: DateObject[]) => dates.filter((date: DateObject) => date.toUnix() !== removedDate.toUnix() ))
                dateService.unpickDate(jwt, { date: removedDate.format(), eventId: event.id })
            }

        }
    }

    if (!event) return (<h1>Loading...</h1>)

    return (
        <DatePicker
            value={event.isOwner ? calendarAllowedDates : calendarPickedDates}
            multiple
            fullYear={false}
            numberOfMonths={numberOfMonths}
            className="rmdp-mobile bg-dark purple"
            showOtherDays={false}
            weekStartDayIndex={1}
            onChange={handleChange}
            plugins={[<DatePanel />]}
            mapDays={({ date }) => {
                let style = {
                    fontWeight: 'normal',
                    color: 'inherit',
                    border: 'none'
                };
                let disabled = false;

                const isWeekend = [0, 6].includes(date.weekDay.index);

                if(isWeekend){
                    style.fontWeight = 'bold';
                    style.color = 'purple';
                }

                if(!event.isOwner) {
                    const inDates = calendarAllowedDates.some(d => {
                        return date.year === d.year && date.month.number === d.month.number && date.day === d.day
                    })
                    const pickedDate = calendarPickedDates.some(d => {
                        return date.year === d.year && date.month.number === d.month.number && date.day === d.day
                    })
                    // console.log(inDates)
                    if (!inDates) {
                        disabled = true;
                        style.fontWeight = 'normal';
                    } else {
                        if (!pickedDate) {
                            style.border = '1px solid green'
                        }
                    }
                }

                return { style, disabled };
            }}
        />
    );
};
