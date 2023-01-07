// @flow
import * as React from 'react';
import styled from "styled-components";
import User from "../../types/User";
import { Tooltip } from 'react-tooltip'
import "react-tooltip/dist/react-tooltip.css";
import uuid from 'react-uuid';

type ImageProps = {
    size: 'small' | 'medium' | 'large';
}
const Image = styled.div<ImageProps>`
  display: table-cell;
  background: #fff;
  border: 1px solid #b9b8b8;
  width: ${props => props.size === 'small' ? 30 : props.size === 'medium' ? 50 : 90}px;
  height: ${props => props.size === 'small' ? 30 : props.size === 'medium' ? 50 : 90}px;
  padding: 5px;
  font-size: ${props => props.size === 'small' ? '.8rem' : props.size === 'medium' ? '1.5rem' : '3rem'};
  border-radius: 50%;
  text-align: center;
  box-shadow: ${props => props.size === 'small' ? '1px 1px 2px rgba(0, 0, 0)' : props.size === 'medium' ? '2px 2px 3px rgba(0, 0, 0)' : '1px 1px 2px rgba(0, 0, 0)'};
  font-weight: 700;
  vertical-align: middle;
  cursor: default;
`

type Props = {
    user: User;
    size?: 'small' | 'medium' | 'large';
    tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
    tooltipVariant?: 'dark' | 'light' | 'success' | 'warning' | 'error' | 'info'
};
export const Avatar = ({ user, size = 'small', tooltipPosition = 'bottom', tooltipVariant = 'dark' }: Props) => {

    const letter = user.displayName.charAt(0);
    const id = uuid();

    return (
        <>
            <Image id={id} size={size}>
                {letter}
            </Image>
            <Tooltip
                anchorId={id}
                place={tooltipPosition}
                variant={tooltipVariant}
            >
                <h3>{user.displayName}</h3>
            </Tooltip>
        </>
    );
};
