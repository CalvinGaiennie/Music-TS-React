import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../context/AuthContextDef";

function NavBar() {
  const { isLoggedIn, logout } = useContext(AuthContext) as AuthContextType;

  // Function to determine className based on active state
  const getNavLinkClassName = ({ isActive }: { isActive: boolean }) => {
    const baseClasses = "nav-link fs-5";
    const activeClasses =
      "text-primary fw-bold border-bottom border-2 border-primary";
    const inactiveClasses = "text-dark";

    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="nav pt-3">
      <ul className="navbar d-flex justify-content-center w-100 list-unstyled gap-0 gap-md-1 gap-lg-4 gap-xl-5">
        <li className="nav-item mb-2 mb-md-0">
          <NavLink className={getNavLinkClassName} to="/">
            Home
            {/* site name or logo */}
          </NavLink>
        </li>
        <li className="nav-item mb-2 mb-md-0">
          <NavLink className={getNavLinkClassName} to="/ear-trainer">
            Ear Trainer
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink
            className={getNavLinkClassName}
            to="/fretboard-simulator"
          >s
            Fretboard Simulator
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={getNavLinkClassName} to="/metronome">
            Metronome
          </NavLink>
        </li> */}
        <li className="nav-item mb-2 mb-md-0">
          <NavLink className={getNavLinkClassName} to="/lessons">
            Lessons
          </NavLink>
        </li>
        <li className="nav-item mb-2 mb-md-0">
          <NavLink className={getNavLinkClassName} to="/song-library">
            Song Library
          </NavLink>
        </li>
        <li className="nav-item mb-2 mb-md-0">
          <NavLink className={getNavLinkClassName} to="/help">
            Help
          </NavLink>
        </li>
        {isLoggedIn ? (
          <li className="nav-item mb-2 mb-md-0">
            <NavLink className={getNavLinkClassName} to="/contribute">
              Contribute
            </NavLink>
          </li>
        ) : null}
        {!isLoggedIn ? (
          <>
            <li className="nav-item mb-2 mb-md-0">
              <NavLink className={getNavLinkClassName} to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item mb-2 mb-md-0">
              <NavLink className={getNavLinkClassName} to="/create-account">
                Create Account
              </NavLink>
            </li>
          </>
        ) : (
          <li className="nav-item mb-2 mb-md-0">
            <button className="btn btn-outline-danger" onClick={logout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
