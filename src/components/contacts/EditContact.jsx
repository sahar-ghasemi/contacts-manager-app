import { Link, useNavigate, useParams } from "react-router-dom";
import { COMMENT, CURRENTLINE, ORANGE, PURPLE } from "../../helpers/color";
import { useContext, useEffect, useState } from "react";
import { contactContext } from "../../context/contactContext";
import { useImmer } from "use-immer";
import {
  getContactById,
  getGroupById,
  updateContact,
} from "../../services/contactService";
import { Spinner } from "../";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { contactSchema } from "../../validation/contactValidation";
import { toast } from "react-toastify";

const EditContact = () => {
  const { contactId } = useParams();
  const { loading, setLoading, setContacts, groups, setFilteredContacts } =
    useContext(contactContext);

  const [contact, setContact] = useImmer({});
  const [contactGroup, setcontactGroup] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContactById(contactId);
        const { data: cGroup } = await getGroupById(contactData.group);
        setLoading(false);
        setContact(contactData);
        setcontactGroup(cGroup);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const submitForm = async (values) => {
    try {
      setLoading(true);
      const { data, status } = await updateContact(contactId, values);
      console.log(data);
      if (status === 200) {
        setLoading(false);
        setContacts((draft) => {
          const contactIndex = draft.findIndex(
            (c) => c.id === parseInt(contactId)
          );
          draft[contactIndex] = { ...data };
        });
        setFilteredContacts((draft) => {
          const contactIndex = draft.findIndex(
            (c) => c.id === parseInt(contactId)
          );
          draft[contactIndex] = { ...data };
        });
        toast.info("Contact Updated Successfully!");
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="row my-2 ">
              <div className="col text-center">
                <div className="h3 fw-bold" style={{ color: ORANGE }}>
                  Edit Contact
                </div>
              </div>
            </div>
            <div className="row mx-5">
              <hr style={{ color: ORANGE }} />
            </div>
          </section>

          <section>
            <div
              className="row p-2 w-75 mx-auto align-items-center"
              style={{ backgroundColor: CURRENTLINE, borderRadius: "1rem" }}
            >
              <div className="col-md-8 col-sm-8">
                <Formik
                  initialValues={{
                    firstname: contact.firstname,
                    lastname: contact.lastname,
                    photo: contact.photo,
                    phone: contact.phone,
                    email: contact.email,
                    job: contact.job,
                    group: contact.group,
                  }}
                  validationSchema={contactSchema}
                  onSubmit={(values) => {
                    submitForm(values);
                  }}
                >
                  <Form>
                    <div className="mb-2">
                      <Field
                        type="text"
                        name="firstname"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="firstname"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mb-2">
                      <Field
                        type="text"
                        name="lastname"
                        className="form-control"
                      />
                    </div>
                    <ErrorMessage
                      name="lastname"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                    <div className="mb-2">
                      <Field
                        type="text"
                        name="photo"
                        className="form-control"
                      />
                    </div>
                    <ErrorMessage
                      name="photo"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                    <div className="mb-2">
                      <Field
                        type="tel"
                        name="phone"
                        className="form-control"
                        maxLength="15"
                      />
                      <ErrorMessage
                        name="phone"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mb-2">
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="email"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mb-2">
                      <Field type="text" name="job" className="form-control" />
                      <ErrorMessage
                        name="job"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mb-2" style={{ position: "relative" }}>
                      <Field as="select" name="group" className="form-select">
                        <option value={""}>{contactGroup.name}</option>
                        {groups.map((g) => (
                          <option key={g.id}>{g.name}</option>
                        ))}
                      </Field>
                      <i
                        className="fa-solid fa-chevron-down"
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          color: "#ffffff",
                        }}
                      ></i>
                      <ErrorMessage name="group" />
                    </div>
                    <div className="mb-2 text-center">
                      <input
                        type="submit"
                        className="btn"
                        style={{
                          backgroundColor: PURPLE,
                          marginRight: "5px",
                          padding: "6px 20px",
                        }}
                        value="submit"
                      />
                      <Link
                        to={"/"}
                        className="btn"
                        style={{ backgroundColor: COMMENT }}
                      >
                        Cancel
                      </Link>
                    </div>
                  </Form>
                </Formik>
              </div>
              <div className="col-md-4 col-sm-4">
                <img
                  className="img-fluid rounded"
                  style={{ border: `1px solid ${PURPLE}` }}
                  src={contact.photo}
                  alt={contact.firstname + contact.lastname}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default EditContact;
