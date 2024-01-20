import React from "react";
import Workspace from "src/components/Workspace";
import ToolBar from "src/components/ToolBar";
import { ToolActionProps } from "src/components/ToolAction";

export default function ProfilePage() {
  // const user = useAppSelector((state) => state.user.user);

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
      >
      </Workspace>
    </>
  );
}
