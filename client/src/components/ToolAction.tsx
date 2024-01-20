import React, { MouseEventHandler } from 'react';
import { Block } from './block/Block';

interface ToolActionProps {
    onClick: MouseEventHandler<HTMLDivElement>;
    children: JSX.Element | JSX.Element[];
}

const ToolAction: React.FC<ToolActionProps> = ({ onClick, children }) => {

    const block_style: React.CSSProperties = {
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
    }
    const block_attrs = {
        onClick: onClick,
        onMouseEnter: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            // make the button do an animation where he goes up and comes back
            const target = e.target as HTMLDivElement;
            target.style.transform = "translateY(-5px)";
            // make a smoother translation
        },
        onMouseLeave: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            // make the button do an animation where he goes up and comes back
            const target = e.target as HTMLDivElement;
            target.style.transform = "translateY(0px)";
        }
    };
    return (
        <Block style={block_style} attrs={block_attrs} >
            {children}
        </Block>
    );
};

export default ToolAction;
