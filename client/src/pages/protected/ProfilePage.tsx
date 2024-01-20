import React from "react";
import { useAppSelector } from "src/store/hooks";
import Workspace from "src/components/Workspace";
import ToolBar from "src/components/ToolBar";
import { Block } from "src/components/block/Block";
import { ToolActionProps } from "src/components/ToolAction";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.user.user);

  const [activeAction, setActiveAction] = React.useState<ToolActionProps | undefined>();

  const [workspaceChildren, setWorkspaceChildren] = React.useState<JSX.Element[]>([]);

  return (
    <>
      <ToolBar
        setCurrentAction={setActiveAction}
        workspaceChildren={workspaceChildren}
        setWorkspaceChildren={setWorkspaceChildren}
      ></ToolBar>
      <Workspace
        activeAction={activeAction}
        children={workspaceChildren}
      ></Workspace>
    </>
  );
}
