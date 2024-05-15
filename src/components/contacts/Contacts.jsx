import { Link } from "react-router-dom";
import { CURRENTLINE, ORANGE, PINK, PURPLE } from "../../helpers/color";
import Spinner from "../Spinner";
import Contact from "./Contact";
import { contactContext } from "../../context/contactContext";
import { useContext } from "react";
const Contacts = () => {
  const { loading, filteredContacts, deleteContact } =
    useContext(contactContext);
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <Link
                to={"/contacts/add"}
                className="btn my-3 fw-bold"
                style={{ backgroundColor: PINK }}
              >
                Create New Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row">
          {loading ? (
            <Spinner />
          ) : filteredContacts.length > 0 ? (
            filteredContacts.map((c) => (
              <Contact
                key={c.id}
                contact={c}
                deleteContact={() => {
                  deleteContact(c.id, c.firstname);
                }}
              />
            ))
          ) : (
            <div className="container">
              <div className="row justify-content-center mt-5">
                <div
                  className="col-md-6 text-center py-5 border rounded-lg"
                  style={{ backgroundColor: CURRENTLINE }}
                >
                  <p className="h3" style={{ color: ORANGE }}>
                    There are no contacts
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default Contacts;
