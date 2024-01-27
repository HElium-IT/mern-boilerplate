import React, { MouseEventHandler, useEffect } from 'react';
import { Block } from './block/Block';

export interface ToolActionProps {
    onClick: MouseEventHandler<HTMLDivElement>;
    active: boolean;
    label: string;
}

const ToolAction: React.FC<ToolActionProps> = ({ onClick, label, active }) => {

    const onBlockClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        active = !active
        onClick(e);
    }

    return (
        <Block className={
            `tool-action` + (active ? ` active` : ``)
        } onClick={onBlockClick} >
            <>{label}</>
        </Block>
    );
};

export default ToolAction;
