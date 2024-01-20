import React from "react";
import { Block } from "src/components/block/Block";

export interface ToolBarProps {
    children: JSX.Element | JSX.Element[];
}

export function ToolBar({ children }: ToolBarProps): JSX.Element {

    const toolBarStyle: React.CSSProperties = { // create a container that takes all the spaces it can get from the parent
        borderRadius: "25px",
        border: "1px solid black",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        padding: "10px",
        margin: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        overflow: "hidden",
        background: "\
        linear-gradient(-45deg, blue -90%, transparent 50%),\
        linear-gradient(135, darkred -90%, transparent 50%),\
        linear-gradient(45deg, darkred -90%, transparent 50%),\
        linear-gradient(225deg, darkred -90%, transparent 50%)\
        "

    }

    return (
        // return a container with style
        <Block style={toolBarStyle}>
            {children}
        </Block>
    )
}

export default ToolBar;