import { Link, useLocation } from "react-router-dom";
import { BACKGROAND, PURPLE } from "../helpers/color";
import SearchContact from "./contacts/SearchContact";

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      <nav
        className="navbar navbar-dark  navbar-expand-sm shadow-lg"
        style={{ backgroundColor: BACKGROAND }}
      >
        <div className="container">
          <div className="row w-100">
            <div className="col">
              <Link to="/" className="navbar-brand">
                <i
                  class="fa-solid fa-bars"
                  style={{
                    color: PURPLE,
                    fontSize: "2rem",
                    marginRight: "10px",
                  }}
                ></i>
                <span style={{ color: PURPLE, fontWeight: "bold" }}>
                  Contact Manager
                </span>{" "}
                App
              </Link>
            </div>
            {location.pathname == "/contacts" ? (
              <div className="col">
                <SearchContact />
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
