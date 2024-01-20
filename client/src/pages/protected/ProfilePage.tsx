import { useAppSelector } from "src/store/hooks";
import Workspace from "src/components/Workspace";
import ToolBar from "src/components/ToolBar";
import ToolAction from "src/components/ToolAction";
import { Block } from "src/components/block/Block";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <>
      <ToolBar>
        <ToolAction onClick={() => { console.log("click") }}>
          <>log "click"</>
        </ToolAction>
      </ToolBar>
      <Workspace>
        <Block draggable style={{}} attrs={{}}>
          <>
            Tavolo 1
          </>
        </Block>
        <Block draggable style={{}} attrs={{}}>
          <>
            Tavolo 2
          </>
        </Block>
        <Block draggable style={{}} attrs={{}}>
          <>
            Tavolo 3
          </>
        </Block>
      </Workspace>
    </>
  );
}
