// @flow
import * as React from 'react';
import Event from '../../../types/Event';
import styled from "styled-components";
import Necessity from "../../../types/Necessity";
import { FaTrash } from 'react-icons/fa'
import necessityService from "../../../services/NecessityService";
import {AuthContext} from "../../../context/AuthContext";
import {useContext, useState} from "react";
import Checkbox from "../../../layouts/Components/Checkbox";
import {Avatar} from "../../../layouts/Components/Avatar";

const Button = styled.button`
  background: none;
  color: lightcoral;
  border: none;
`

type Props = {
    necessity: Necessity;
    event: Event;
};
export const NecessityListItem = ({ necessity, event }: Props) => {
    const {jwt, userId} = useContext(AuthContext);
    const [checked, setChecked] = useState(false)

    const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if(jwt) necessityService.removeNecessity(jwt, necessity.id).then(() => {
            // setNecessities((necessities: Necessity[]) => necessities.filter(necessity => necessity.id !== id))
        });
    }

    return (
        <table>
            <tr>
                <td style={{ width: '45%'}}>
                    <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
                    {necessity.name}
                </td>
                <td style={{ width: '45%'}}>
                    <Avatar user={necessity.creator} />
                </td>
                <td style={{ width: '10%'}}>
                    {(event.isOwner || necessity.creator.id === userId) && (
                        <Button data-id={necessity.id} onClick={handleRemove as any}><FaTrash /></Button>
                    )}
                </td>
            </tr>
        </table>
    );
};
