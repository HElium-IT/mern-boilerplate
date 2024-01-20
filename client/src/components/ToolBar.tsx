import React from "react";
import { Block } from "src/components/block/Block";
import ToolAction, { ToolActionProps } from "src/components/ToolAction";

export interface ToolBarProps {
    setCurrentAction: React.Dispatch<React.SetStateAction<ToolActionProps | undefined>>;
    workspaceChildren: JSX.Element[];
    setWorkspaceChildren: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
}

export function ToolBar({ setCurrentAction, workspaceChildren, setWorkspaceChildren }: ToolBarProps): JSX.Element {

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
        background: "linear-gradient(-45deg, blue -90%, transparent 50%),linear-gradient(135, darkred -90%, transparent 50%),linear-gradient(45deg, darkred -90%, transparent 50%),linear-gradient(225deg, darkred -90%, transparent 50%)"
    }

    const tableAction: ToolActionProps = {
        active: false,
        onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            console.log(`\nClicked table action`)
            // read number of tables from workspaceChildren (it's in the props.type)
            const tableCount = workspaceChildren.filter((child) => child.props.type === "table").length;
            const table =
                <Block
                    key={tableCount}
                    _draggable={true}
                    type={"table"}
                >
                    <>Tavolo {tableCount + 1}</>
                </Block>

            setWorkspaceChildren(workspaceChildren => [...workspaceChildren, table]);
            console.log(`\nAdded table ${tableCount + 1} to workspace`)
        },
        label: "Table"
    }

    const [actions, setActions] = React.useState<ToolActionProps[]>(
        [tableAction]
    );

    const clickAction = (actionKey: string) => {
        console.log(`\nClicked action: ${actionKey}`)
        let activeAction = undefined
        actions.forEach((action) => {
            if (action.label === actionKey) {
                if (action.active === false) {
                    action.active = true;
                    activeAction = action;
                } else {
                    action.active = false;
                }
            } else {
                action.active = false;
            }
        })
        setActions(actions);
        setCurrentAction(activeAction);
    }


    return (
        // return a container with style
        <Block _style={toolBarStyle}>
            {
                actions.map((action, index) => {
                    return <ToolAction
                        key={index}
                        active={action.active}
                        onClick={() => clickAction(action.label)}
                        label={action.label}
                    />
                })
            }
        </Block>
    )
}

export default ToolBar;