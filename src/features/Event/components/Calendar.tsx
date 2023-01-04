// @flow 
import * as React from 'react';
import {Calendar as DatePicker, DateObject} from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import "react-multi-date-picker/styles/layouts/mobile.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import "react-multi-date-picker/styles/colors/purple.css"
import {useContext, useEffect, useState} from "react";
import dateService from "../../../services/DateService";
import {AuthContext} from "../../../context/AuthContext";
import {EventContext} from "../../../context/EventContext";
import Date from '../../../types/Date';

function getDifference(array1: DateObject[], array2: DateObject[]) {
    return array1.filter(object1 => {
        return !array2.some(object2 => {
            return object1.year === object2.year && object1.month.number === object2.month.number && object1.day === object2.day;
        });
    });
}

export const Calendar = () => {
    const {jwt} = useContext(AuthContext);
    const {event} = useContext(EventContext);
    const [allowedDates, setAllowedDates] = useState<DateObject[]>([]);
    const [pickedDates, setPickedDates] = useState<DateObject[]>([]);

    useEffect(() => {
        if(event) {
            setAllowedDates(event.dates.map((date) => {
                return new DateObject(date.date);
            }));
        }
    }, [event]);

    useEffect(() => {
        if(!event?.isOwner && jwt && event) {
            dateService.getPickedDates(jwt, event.id).then(dates => {
                setPickedDates(dates.map((date: Date) => {
                    return new DateObject(date.date);
                }));
            })
        }
    }, [event]);

    const handleChange = (newDates: DateObject[]) => {
        if(!event || !jwt) return

        if(event.isOwner) {
            if (newDates.length > allowedDates.length) {
                let newDate = getDifference(newDates, allowedDates)[0];
                setAllowedDates(dates => [...dates, newDate])
                dateService.addDate(jwt, { date: newDate.format(), eventId: event.id });
            } else {
                let removedDate = getDifference(allowedDates, newDates)[0]
                setAllowedDates(dates => dates.filter((date: DateObject) => date.toUnix() !== removedDate.toUnix()))
                dateService.removeDate(jwt, { date: removedDate.format(), eventId: event.id })
            }
        } else {
            if (newDates.length > pickedDates.length) {
                let newDate = getDifference(newDates, pickedDates)[0];
                setPickedDates(dates => [...dates, newDate])
                // addDate(jwt, {date: newDate.format(), eventId: event.id});
                dateService.pickDate(jwt, { date: newDate.format(), eventId: event.id })
            } else {
                let removedDate = getDifference(pickedDates, newDates)[0];
                setPickedDates(dates => dates.filter((date: DateObject) => date.toUnix() !== removedDate.toUnix() ))
                dateService.unpickDate(jwt, { date: removedDate.format(), eventId: event.id })
            }
        }
    }

    if (!event) return (<h1>Loading...</h1>)

    return (
        <DatePicker
            value={event.isOwner ? allowedDates : pickedDates}
            multiple
            fullYear={false}
            numberOfMonths={3}
            className="rmdp-mobile bg-dark purple"
            showOtherDays={false}
            weekStartDayIndex={1}
            onChange={handleChange}
            plugins={[
                <DatePanel />,
            ]}
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
                    const inDates = allowedDates.some(d => {
                        return date.year === d.year && date.month.number === d.month.number && date.day === d.day
                    })
                    // console.log(inDates)
                    if (!inDates) {
                        disabled = true;
                        style.fontWeight = 'normal';
                    } else {
                        style.border = '1px solid green'
                    }
                }

                return { style, disabled };
            }}
        />
    );
};
