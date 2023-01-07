// @flow
import * as React from 'react';
import HashLoader from "react-spinners/HashLoader";
import {FullCentered} from "../../assets/styles/Containers";

type Props = {
    color?: string;
    size?: number;
};
export const Loader = ({ color = 'purple', size = 150 }: Props) => {
    return (
        <FullCentered>
            <HashLoader
                color={color}
                loading={true}
                size={size}
                aria-label={'Loading...'}
                />
        </FullCentered>
    );
};
