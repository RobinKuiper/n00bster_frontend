// @flow 
import * as React from 'react';
import {useContext, useEffect, useRef, useState} from "react";
import dateService from "../../../services/DateService";
import {AuthContext} from "../../../context/AuthContext";
import {EventContext} from "../../../context/EventContext";
import User from "../../../types/User";
import {List, Panel} from "../../../layouts/Components/StyledComponents";
import {Loader} from "../../../layouts/Components/Loader";
import {useParams} from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import {Doughnut, getElementAtEvent} from "react-chartjs-2";
import {PickedDateListItem} from "./PickedDateListItem";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip);

const NoDates = styled.p`
  text-align: center;
  font-size: 1.5em;
  font-weight: 700;
  color: #6B646B;
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

export const PickedDates = () => {
    const chartRef = useRef();
    const { identifier = '' } = useParams()
    const [groupedPickedDates, setGroupedPickedDates] = useState<{ [key: string]: ObjectType[]; }>({});
    const {jwt} = useContext(AuthContext);
    const {event, allPickedDates, setAllPickedDates} = useContext(EventContext);
    // const [topDate, setTopDate] = useState<JSX.Element>(<></>)
    const [loading] = useState(false)
    const [chartLabels, setChartLabels] = useState<string[]>([])
    const [chartVotes, setChartVotes] = useState<number[]>([])

    useEffect(() => {
        if(event && jwt && event.identifier !== identifier) {
            dateService.getAllPickedDates(jwt, event.id).then(dates => {
                setAllPickedDates(dates)
            })
        }
    }, [identifier])

    useEffect(() => {
        const grouped = group(allPickedDates);

        const sorted = Object.entries(grouped).sort(
            (a, b) =>
                b[1].length - a[1].length)

        // setChartLabels(Object.keys(grouped))
        // setChartVotes(Object.values(grouped).map(value => value.length))

        const chartLabels: Array<string> = []
        const chartVotes: Array<number> = []
        sorted.forEach((o) => {
            chartLabels.push(o[0])
            chartVotes.push(o[1].length)
        })
        setChartLabels(chartLabels)
        setChartVotes(chartVotes)

        setGroupedPickedDates(Object.fromEntries(sorted));
    }, [allPickedDates]);

    // useEffect(() => {
    //     const dates = Object.keys(groupedPickedDates);
    //     if (
    //         dates.length > 0
    //         && (dates.length === 1
    //             || dates[0].length > dates[1].length)
    //     ) {
    //         setTopDate(<DateLabel>{dates[0]}</DateLabel>)
    //         return;
    //     }
    //     setTopDate(<></>)
    // }, [groupedPickedDates]);

    const colors = [
        'rgba(255, 0, 0, 0.2)',
        'rgba(0, 255, 0, 0.2)',
        'rgba(0, 0, 255, 0.2)',
        'rgba(255, 255, 0, 0.2)',
        'rgba(255, 0, 255, 0.2)',
        'rgba(0, 255, 255, 0.2)',
        'rgba(255, 128, 0, 0.2)',
        'rgba(255, 0, 128, 0.2)',
        'rgba(128, 255, 0, 0.2)',
        'rgba(0, 255, 128, 0.2)',
        'rgba(128, 0, 255, 0.2)',
        'rgba(0, 128, 255, 0.2)',
        'rgba(128, 128, 0, 0.2)',
        'rgba(128, 0, 128, 0.2)',
        'rgba(0, 128, 128, 0.2)',
        'rgba(128, 128, 128, 0.2)',
        'rgba(255, 128, 128, 0.2)',
        'rgba(128, 255, 128, 0.2)',
        'rgba(128, 128, 255, 0.2)',
        'rgba(255, 255, 128, 0.2)',
        'rgba(255, 128, 255, 0.2)',
        'rgba(128, 255, 255, 0.2)',
        'rgba(0, 0, 0, 0.2)',
        'rgba(128, 128, 128, 0.2)',
        'rgba(255, 255, 255, 0.2)',
        'rgba(255, 0, 0, 0.2)',
        'rgba(0, 255, 0, 0.2)',
        'rgba(0, 0, 255, 0.2)',
        'rgba(255, 255, 0, 0.2)',
        'rgba(255, 0, 255, 0.2)',
    ]

    const textColors = colors.map(color => color.replace('0.2', '1'))

    const data = {
        labels: chartLabels,
        datasets: [
            {
                label: '# of Picks',
                data: chartVotes,
                backgroundColor: colors,
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 255, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 0, 255, 1)',
                    'rgba(0, 255, 255, 1)',
                    'rgba(255, 128, 0, 1)',
                    'rgba(255, 0, 128, 1)',
                    'rgba(128, 255, 0, 1)',
                    'rgba(0, 255, 128, 1)',
                    'rgba(128, 0, 255, 1)',
                    'rgba(0, 128, 255, 1)',
                    'rgba(128, 128, 0, 1)',
                    'rgba(128, 0, 128, 1)',
                    'rgba(0, 128, 128, 1)',
                    'rgba(128, 128, 128, 1)',
                    'rgba(255, 128, 128, 1)',
                    'rgba(128, 255, 128, 1)',
                    'rgba(128, 128, 255, 1)',
                    'rgba(255, 255, 128, 1)',
                    'rgba(255, 128, 255, 1)',
                    'rgba(128, 255, 255, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(128, 128, 128, 1)',
                    'rgba(255, 255, 255, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 255, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 0, 255, 1)',
                ],
                borderWidth: 1,
                hoverOffset: -5,
                // hoverBackgroundColor: 'gray',
                // offset: 0,
                // weight: 1.5
            },
        ],
    };

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        // @ts-ignore
        console.log(getElementAtEvent(chartRef.current, e))
    }

    return (
        <Panel alignItems={'center'}>
            {/*<Flex direction={'row'}>*/}
            {/*    <h4>Picked Dates</h4>*/}
            {/*    {topDate}*/}
            {/*</Flex>*/}

            {!loading ? (
                <div>
                    {Object.keys(groupedPickedDates).length ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridAutoRows: '1fr' }}>
                            <div style={{ margin: '0 auto', width: '80%' }}>
                                <Doughnut
                                    ref={chartRef}
                                    data={data}
                                    options={{ plugins: { legend: { position: 'bottom' } } }}
                                    onClick={handleClick}
                                />
                            </div>

                            <div>
                                <List>
                                    { Object.keys(groupedPickedDates).map((key: string, index) => (
                                        <PickedDateListItem key={index} date={key} votes={groupedPickedDates[key]} color={textColors[index%colors.length]} />
                                    )) }
                                </List>
                            </div>
                        </div>
                    ) : (
                        <NoDates>No dates picked (yet).</NoDates>
                    )}
                </div>
            ) : (
                <Loader size={100} />
            )}
        </Panel>
    );
};
