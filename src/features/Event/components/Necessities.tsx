// @flow
import * as React from 'react';
import Event from '../../../types/Event'
import styled from "styled-components";

const Input = styled.input`
  padding: 5px;
  border-radius: 4px 0 0 4px;
  border: 1px solid lightgray;
`

const Button = styled.button`
  padding: 5px;
  border-radius: 0 4px 4px 0;
  border: 1px solid lightgray;

`

type Props = {
    event: Event;
};
export const Necessities = ({ event }: Props) => {
    const necessities = event.necessities.length === 0
        ? <p>Nothing (yet).</p>
        : event.necessities.map(necessity => (
            <p>{necessity}</p>
        ))

    return (
        <div>
            <h5>Necessities</h5>
            {necessities}
            <Input type='text' name='name' placeholder='New Necessity' />
            <Button>+</Button>
        </div>
    );
};
