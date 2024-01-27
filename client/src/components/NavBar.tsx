import { NavLink, NavLinkProps } from "react-router-dom";
import { useAppSelector } from "src/store/hooks";

import { Block } from "src/components/block/Block";

export default function NavBar() {
  const { isAuth } = useAppSelector((state) => state.user);

  const navBarStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    color: "white",
    padding: "10px",

    background: "linear-gradient(-45deg, blue -30%, transparent 80%),linear-gradient(45deg, darkred 20%, crimson, darkorange 60%, gold, bisque)",
  };

  const navLinkStyle: NavLinkProps["style"] = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: "black",
    };
  }

  return (
    <Block className="nav-bar">
      {isAuth ? (
        <>
          <NavLink style={navLinkStyle} to='/my-profile'>
            <Block>
              <>My Profile</>
            </Block>
          </NavLink>
          <NavLink
            style={navLinkStyle}
            to='/logout'><Block>
              <>Logout</>
            </Block></NavLink>

        </>
      ) : (
        <>
          <Block><NavLink style={navLinkStyle} to='/login'>
            Login
          </NavLink></Block>
          <Block><NavLink style={navLinkStyle} to='/register'>
            Register
          </NavLink></Block>
        </>
      )}
    </Block >
  );
}
