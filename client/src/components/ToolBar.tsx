import React from "react";
import { Block } from "src/components/block/Block";
import ToolAction, { ToolActionProps } from "src/components/ToolAction";

export interface ToolBarProps {
    setCurrentAction: React.Dispatch<React.SetStateAction<ToolActionProps | undefined>>;
    workspaceChildren: JSX.Element[];
    setWorkspaceChildren: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
}

export function ToolBar({ setCurrentAction, workspaceChildren, setWorkspaceChildren }: ToolBarProps): JSX.Element {


    const tableAction: ToolActionProps = {
        active: false,
        onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            console.log(`\nClicked table action`)
            // read number of tables from workspaceChildren (it's in the props.type)
            const table =
                <Block
                    key={workspaceChildren.length}
                    className="table"
                    is_draggable={true}
                    style={{
                        top: e.clientY,
                        left: e.clientX,
                    }}
                >
                    <>Tavolo </>
                </Block>

            setWorkspaceChildren(workspaceChildren => [...workspaceChildren, table]);
            console.log(`\nAdded table to workspace`)
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
        <Block className="tool-bar">
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