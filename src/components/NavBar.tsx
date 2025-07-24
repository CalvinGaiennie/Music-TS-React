import { NavLink } from "react-router-dom";
function NavBar() {
  return (
    <nav className="nav pt-3">
      <ul className="navbar d-flex justify-content-center w-100 list-unstyled gap-0 gap-md-1 gap-lg-4 gap-xl-5">
        <li className="nav-item">
          <NavLink className="nav-link fs-5 text-dark" to="/">
            Home
            {/* site name or logo */}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link fs-5 text-dark" to="/ear-trainer">
            Ear Trainer
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link fs-5 text-dark"
            to="/fretboard-simulator"
          >
            Fretboard Simulator
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link fs-5 text-dark" to="/metronome">
            Metronome
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link fs-5 text-dark" to="/lessons">
            Lessons
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link fs-5 text-dark" to="/contribute">
            Contribute
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link fs-5 text-dark" to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
