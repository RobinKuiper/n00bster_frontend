// @flow 
import * as React from 'react';
import {useContext, useEffect, useState} from "react";
import dateService from "../../../services/DateService";
import {AuthContext} from "../../../context/AuthContext";
import {EventContext} from "../../../context/EventContext";
import {countBy, Dictionary, groupBy, max, sortBy} from "lodash";
import User from "../../../types/User";
import styled from "styled-components";

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

function group(objectArray: Array<ObjectType>): { [key: string]: Array<ObjectType> } {
    return objectArray.reduce((acc: { [key: string]: Array<ObjectType> }, obj) => {
        const key = obj['date'];
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
    const [pickedDates, setPickedDates] = useState<{ [key: string]: ObjectType[]; }>({});
    const {jwt} = useContext(AuthContext);
    const {event} = useContext(EventContext);

    useEffect(() => {
        if(event && jwt) {
            dateService.getAllPickedDates(jwt, event.id).then((dates: Array<ObjectType>) => {
                const grouped = group(dates);

                const sorted = Object.entries(grouped).sort(
                    (a, b) =>
                        b[1].length - a[1].length)

                setPickedDates(Object.fromEntries(sorted));
            })
        }
    }, [event])

    return (
        <Container>
            <h5>Picked Dates</h5>

            <div>Best date so far: <span>{Object.keys(pickedDates)[0]}</span></div>

            <Table>
                <tr>
                   <th>Date</th>
                   <th>Votes</th>
                   <th>Members</th>
                </tr>
            { Object.keys(pickedDates).map((key: string) => (
                <tr>
                    <td>{ key }</td>
                    <td>{ pickedDates[key].length }</td>
                    <td>
                        { pickedDates[key].map(value => (
                            <span>{ value.user.displayName }, </span>
                        ))}
                    </td>
                </tr>
            )) }
            </Table>
        </Container>
    );
};
