import React, { MouseEventHandler, useEffect } from 'react';
import { Block } from './block/Block';

export interface ToolActionProps {
    onClick: MouseEventHandler<HTMLDivElement>;
    active: boolean;
    label: string;
}

const ToolAction: React.FC<ToolActionProps> = ({ onClick, label, active }) => {

    const activeStyle = {
        background: "linear-gradient(45deg, darkred 20%, crimson, darkorange 60%, gold, bisque)",
        color: "black",
    }

    const notActiveStyle = {
        background: "linear-gradient(45deg, lightblue 20%, blue, darkblue 60%, darkcyan)",
        color: "white"
    }

    const [blockStyle, setBlockStyle] = React.useState<React.CSSProperties>({
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
        ...notActiveStyle
    });

    useEffect(() => {
        // if active, updateStyle with a different background, with a gradient
        if (active) {
            console.log(`\n${label} is active`)
            setBlockStyle({
                ...blockStyle,
                ...activeStyle
            })
        } else {
            console.log(`\n${label} is not active`)
            setBlockStyle({
                ...blockStyle,
                ...notActiveStyle
            })
        }

    }, [active])



    const onBlockClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        active = !active
        onClick(e);
    }

    const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // make the button do an animation where he goes up and comes back
        const target = e.target as HTMLDivElement;
        target.style.transform = "translateY(-5px)";
        // make a smoother translation
    }
    const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // make the button do an animation where he goes up and comes back
        const target = e.target as HTMLDivElement;
        target.style.transform = "translateY(0px)";
    }

    return (
        <Block _style={blockStyle} onClick={onBlockClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
            <>{label}</>
        </Block>
    );
};

export default ToolAction;
