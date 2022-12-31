import {AuthContext} from "../context/AuthContext";
import {useContext, useEffect} from "react";
import {EventContext} from "../context/EventContext";
import {getEvent} from "../services/EventService";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {Calendar} from "../features/Event/components/Calendar";
import {EventInfo} from "../features/Event/components/EventInfo";
import {Necessities} from "../features/Event/components/Necessities";
import { Members } from "../features/Event/components/Members";
import {Layout} from "../layouts/Layout";
import {LoadingContext} from "../context/LoadingContext";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 2.5fr repeat(2, 1fr);
    grid-template-rows: 1fr 1.5fr;
    grid-column-gap: 0;
    grid-row-gap: 0;
`
type Props = {
    area: string;
    padding?: string;
}
const GridCell = styled.div<Props>`
  grid-area: ${props => props.area};
  padding: ${props => props.padding ?? '10px'};
`

export default function Event() {
    const { identifier = '' } = useParams()
    const { jwt } = useContext(AuthContext);
    const { event, setEvent } = useContext(EventContext);
    const { loading, setLoading } = useContext(LoadingContext);

    useEffect(() => {
        setLoading(true);
        if(!event || event.identifier !== identifier) {
            if(jwt) {
                getEvent(jwt, identifier).then(event => {
                    setEvent(event)
                    setLoading(false);
                });
            }
        }
    }, [jwt]);

    return (
        <Layout>
            {!loading && event ? (
                <GridContainer>
                    <GridCell area='1 / 1 / 3 / 2'>
                        <Calendar />
                    </GridCell>
                    <GridCell area='1 / 2 / 2 / 4'>
                        <EventInfo event={event} />
                    </GridCell>
                    <GridCell area='2 / 2 / 3 / 3'>
                        <Necessities event={event} />
                    </GridCell>
                    <GridCell area='2 / 3 / 3 / 4'>
                        <Members event={event} />
                    </GridCell>
                </GridContainer>
            ) : (
                  <h1>Loading...</h1>
            )}
        </Layout>
    );
}
