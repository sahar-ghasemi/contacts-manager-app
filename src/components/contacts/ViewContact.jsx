import { Link, useParams } from "react-router-dom";
import { CURRENTLINE, CYAN, PURPLE } from "../../helpers/color";
import { useContext, useEffect, useState } from "react";
import { contactContext } from "../../context/contactContext";
import { getContactById, getGroupById } from "../../services/contactService";
const ViewContact = () => {
  const { contactId } = useParams();

  const [state, setState] = useState({
    contact: {},
    group: {},
  });

  const { loading, setLoading } = useContext(contactContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContactById(contactId);
        const { data: groupData } = await getGroupById(contactData.group);
        setState({
          ...state,
          contact: contactData,
          group: groupData,
        });
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { contact, group } = state;
  return (
    <>
      <section className="view-contact-intro p3">
        <div className="container p-2">
          <div className="row ">
            <div className="col text-center">
              <div className="h3 fw-bold" style={{ color: CYAN }}>
                Contact Info
              </div>
            </div>
          </div>
        </div>
        <div className="row mx-5">
          <hr style={{ color: CYAN }} />
        </div>
      </section>

      <section className="view-contact mt-e">
        <div
          className="container p-2"
          style={{ backgroundColor: CURRENTLINE, borderRadius: "1em" }}
        >
          <div className="row align-items-center">
            <div className="col-md-3">
              <img
                src={contact.photo}
                alt={contact.firstname + contact.lastname}
                className="img-fluid rounded"
                style={{ border: `1px solid ${PURPLE}` }}
              />
            </div>
            <div className="col-md-9">
              <ul className="list-group">
                <li className="list-group-item list-group-item-dark">
                  FirstName:
                  <span className="fw-bold">{contact.firstname}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  LastName:
                  <span className="fw-bold"> {contact.lastname}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  Mobile:
                  <span className="fw-bold">{contact.phone}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  Email:
                  <span className="fw-bold"> {contact.email}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  job:
                  <span className="fw-bold"> {contact.job}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  group: <span className="fw-bold"> {group.name}</span>
                </li>
              </ul>
              <div className="row my-2">
                <div className="d-grid gap-2 col-4 mx-auto">
                  <Link
                    to={"/"}
                    className="btn"
                    style={{ backgroundColor: PURPLE }}
                  >
                    Back to List
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ViewContact;
