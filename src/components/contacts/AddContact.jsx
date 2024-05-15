import { COMMENT, GREEN, PURPLE } from "../../helpers/color";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { contactSchema } from "../../validation/contactValidation";
import { contactContext } from "../../context/contactContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
const AddContact = () => {
  const { createContact, groups } = useContext(contactContext);
  return (
    <>
      <section className="p-3">
        <img
          src={require("../../assets/man-taking-note.png")}
          alt=""
          height="400px"
          style={{
            position: "absolute",
            opacity: "50%",
            zIndex: "-1",
            top: "130px",
            right: "40px",
          }}
        />
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <div className="h3 fw-bold" style={{ color: GREEN }}>
                New Contact
              </div>
              <div className="row mx-5">
                <hr style={{ color: GREEN }} />
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <Formik
                initialValues={{
                  firstname: "",
                  lastname: "",
                  photo: "",
                  phone: "",
                  email: "",
                  job: "",
                  group: "",
                }}
                validationSchema={contactSchema}
                onSubmit={(values) => {
                  createContact(values);
                }}
              >
                <Form>
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="firstname"
                      className="form-control"
                      placeHolder="firstname"
                    />
                    <ErrorMessage
                      name="firstname"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                  </div>
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="lastname"
                      className="form-control"
                      placeHolder="lastname"
                    />
                    <ErrorMessage
                      name="lastname"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                  </div>
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="photo"
                      className="form-control"
                      placeHolder="photo"
                    />
                    <ErrorMessage
                      name="photo"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                  </div>
                  <div className="mb-2">
                    <Field
                      type="tel"
                      name="phone"
                      className="form-control"
                      placeHolder="phone"
                    />
                    <ErrorMessage
                      name="phone"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                  </div>
                  <div className="mb-2">
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      placeHolder="email"
                    />
                    <ErrorMessage
                      name="email"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                  </div>
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="job"
                      className="form-control"
                      placeHolder="job"
                    />
                    <ErrorMessage
                      name="job"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                  </div>
                  <div className="mb-2">
                    <Field as="select" name="group" className="form-control">
                      <option value={""}> Choose group</option>
                      {groups.map((g) => (
                        <option kry={g.id}>{g.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="group"
                      render={(msg) => <div className="text-danger">{msg}</div>}
                    />
                  </div>
                  <div className="mb-2 text-center">
                    <Link
                      to={"/"}
                      className="btn"
                      style={{ backgroundColor: COMMENT }}
                    >
                      Cancel
                    </Link>
                    <input
                      type="submit"
                      className="btn"
                      style={{
                        backgroundColor: PURPLE,
                        marginLeft: "5px",
                        padding: "6px 20px",
                      }}
                      value="Create Contact"
                    />
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AddContact;
