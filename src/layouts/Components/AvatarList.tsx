// @flow 
import * as React from 'react';
import {Avatar} from "./Avatar";
import styled from "styled-components";
import User from "../../types/User";
import uuid from "react-uuid";

type AvatarsProps = {
    marginRight: string;
}
const Avatars = styled.div<AvatarsProps>`
  > * {
    margin-right: ${props => props.marginRight};
  }
`


type Props = {
    marginRight: string;
    members: User[]|any[];
    userKey?: string;
    size?: 'small' | 'medium' | 'large';
    tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
    tooltipVariant?: 'dark' | 'light' | 'success' | 'warning' | 'error' | 'info'
};
export const AvatarList = ({ marginRight, members, userKey, size = 'small', tooltipPosition = 'bottom', tooltipVariant = 'dark' }: Props) => {
    return (
        <Avatars marginRight={members.length > 1 ? marginRight : '0'}>
            { members.map((member) => {
                const m: User = userKey ? member[userKey] : member;
                return <span key={uuid()}><Avatar user={m} size={size} tooltipPosition={tooltipPosition} tooltipVariant={tooltipVariant} /></span>
            })}
        </Avatars>
    );
};
