import React, { useEffect } from "react";
import { Block } from "src/components/block/Block";
import { ToolActionProps } from "./ToolAction";

export interface WorkspaceProps {
    children: JSX.Element | JSX.Element[];
    activeAction?: ToolActionProps
}

export function Workspace({ children, activeAction }: WorkspaceProps): JSX.Element {


    useEffect(() => {
        if (activeAction !== undefined) {
            console.log(`\nActivated action: ${activeAction.label}`)
        }
    }, [activeAction])

    return (
        // return a container with style
        <Block className="workspace" onClick={activeAction?.onClick}>
            {children}
        </Block>
    )
}

export default Workspace;