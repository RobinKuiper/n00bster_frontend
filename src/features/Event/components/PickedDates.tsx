// @flow 
import * as React from 'react';
import {useContext, useEffect, useState} from "react";
import dateService from "../../../services/DateService";
import {AuthContext} from "../../../context/AuthContext";
import {EventContext} from "../../../context/EventContext";
import {countBy, Dictionary, groupBy, max, sortBy} from "lodash";
import User from "../../../types/User";
import styled from "styled-components";
import {DateObject} from "react-multi-date-picker";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;

  > * + * {
    margin-top: 20px;
  }
`

const Table = styled.table`
  width: 100%;
  
  th{
    text-align: left;
  }
`

interface ObjectType {
    user: User,
    date: string
}

function group(objectArray: Array<{ user: User, date: string }>): { [key: string]: Array<ObjectType> } {
    return objectArray.reduce((acc: { [key: string]: Array<ObjectType> }, obj) => {
        const key = obj.date;
        if (!acc[key]) {
            acc[key] = [];
        }
        // Add object to list for given key's value
        acc[key].push(obj);
        return acc;
    }, {});
}

type Props = {
    
};
export const PickedDates = (props: Props) => {
    const [groupedPickedDates, setGroupedPickedDates] = useState<{ [key: string]: ObjectType[]; }>({});
    const {jwt} = useContext(AuthContext);
    const {event, allPickedDates, setAllPickedDates} = useContext(EventContext);

    useEffect(() => {
        if(event && jwt) {
            dateService.getAllPickedDates(jwt, event.id).then(dates => {
                setAllPickedDates(dates)
            })
        }
    }, [event])

    useEffect(() => {
        const grouped = group(allPickedDates);

        const sorted = Object.entries(grouped).sort(
            (a, b) =>
                b[1].length - a[1].length)

        setGroupedPickedDates(Object.fromEntries(sorted));
    }, [allPickedDates]);


    return (
        <Container>
            <h5>Picked Dates</h5>

            <div>Best date so far: <span>{Object.keys(groupedPickedDates)[0]}</span></div>

            <Table>
                <thead>
                    <tr>
                       <th>Date</th>
                       <th>Votes</th>
                       <th>Members</th>
                    </tr>
                </thead>
                <tbody>
                { Object.keys(groupedPickedDates).map((key: string) => (
                    <tr key={key}>
                        <td>{ key }</td>
                        <td>{ groupedPickedDates[key].length }</td>
                        <td>
                            { groupedPickedDates[key].map((value, id) => (
                                <span key={id}>{ value.user.displayName }, </span>
                            ))}
                        </td>
                    </tr>
                )) }
                </tbody>
            </Table>
        </Container>
    );
};
