// @flow
import * as React from 'react';
import Event from '../../../types/Event';
import styled from "styled-components";
import Necessity from "../../../types/Necessity";
import { FaTrash } from 'react-icons/fa'
import necessityService from "../../../services/NecessityService";
import {AuthContext} from "../../../context/AuthContext";
import {useContext, useEffect, useState} from "react";
import Checkbox from "../../../layouts/Components/Checkbox";
import {Avatar} from "../../../layouts/Components/Avatar";
import {CgInfinity} from "react-icons/cg";

const Button = styled.button`
  background: none;
  color: lightcoral;
  border: none;
`

const Avatars = styled.div`
  > * {
    margin-right: -15px;
  }
`

type Props = {
    necessity: Necessity;
    event: Event;
};
export const NecessityListItem = ({ necessity, event }: Props) => {
    const {jwt, userId} = useContext(AuthContext);
    const [checked, setChecked] = useState(false)
    const [hasNecessity, setHasNecessity] = useState(false)
    const [completed, setCompleted] = useState(necessity.amount !== -1 && necessity.members.length >= necessity.amount)

    useEffect(() => {
        let c = necessity.amount !== -1 && necessity.members.length >= necessity.amount;
        setCompleted(c)

        setHasNecessity(false)
        let has = false;
        necessity.members.forEach(member => {
            if (member.id === userId) {
                setHasNecessity(true)
                has = true;
            }
        })

        if (!c) {
            setChecked(has)
        } else {
            setChecked(true)
        }
    }, [necessity])

    const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if(jwt) necessityService.removeNecessity(jwt, necessity.id).then(() => {});
    }

    const handleChange = () => {
        if(jwt){
            if(checked) {
                necessityService.unpickNecessity(jwt, { necessityId: necessity.id });
            } else {
                necessityService.pickNecessity(jwt, { necessityId: necessity.id })
            }
            setChecked(!checked)
        }
    }

    return (
        <table>
            <tbody>
                <tr>
                    <td style={{ width: '45%', textDecoration: completed ? 'line-through' : ''}}>
                        <Checkbox checked={checked} onChange={handleChange} disabled={!hasNecessity && completed} />
                        <span>{necessity.name} </span>
                        {necessity.amount === -1 && <CgInfinity style={{ display: 'inline' }} />}
                        {necessity.amount > 1 && (
                            <sup>({necessity.members.length}/{necessity.amount})</sup>
                        )}
                    </td>
                    <td style={{ width: '45%'}}>
                        <Avatars>
                            {necessity.members.map((member) => (
                                <span key={member.id}><Avatar user={member} /></span>
                            ))}
                        </Avatars>
                    </td>
                    <td style={{ width: '10%'}}>
                        {(event.isOwner || necessity.creator.id === userId) && (
                            <Button data-id={necessity.id} onClick={handleRemove as any}><FaTrash /></Button>
                        )}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};
