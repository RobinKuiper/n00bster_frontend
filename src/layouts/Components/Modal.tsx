// @flow 
import * as React from 'react';
import ReactModal, {OnAfterOpenCallback, Styles} from 'react-modal';

type Props = {
    isOpen: boolean;
    children: React.ReactElement|React.ReactElement[];
    afterOpenModal?: OnAfterOpenCallback;
    style?: Styles;
    contentLabel?: string;
};
export const Modal = ({ isOpen, afterOpenModal, children, style, contentLabel }: Props) => {
    return (
        <ReactModal isOpen={isOpen} onAfterOpen={afterOpenModal} style={style} contentLabel={contentLabel}>
            {children}
        </ReactModal>
    );
};
