import { useEffect, useState } from "react";
import "./App.css";
import {
  ViewContact,
  EditContact,
  AddContact,
  Contacts,
  Navbar,
} from "./components";

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getAllGroups,
} from "./services/contactService";
import { useImmer } from "use-immer";
import { confirmAlert } from "react-confirm-alert";
import { contactContext } from "./context/contactContext";
import {
  COMMENT,
  CURRENTLINE,
  FOREGROAND,
  PURPLE,
  YELLOW,
} from "./helpers/color";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";

function App() {
  const [contacts, setContacts] = useImmer([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredContacts, setFilteredContacts] = useImmer([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const removeContact = async (contactId) => {
    const contactBackup = [...contacts];
    try {
      setLoading(true);
      setContacts(contacts.filter((c) => c.id !== contactId));
      setFilteredContacts(contacts.filter((c) => c.id !== contactId));

      const { status } = await deleteContact(contactId);
      if (status !== 200) {
        setContacts(contactBackup);
      }
      toast.error("Contact Removed Successfully!");

      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setContacts(contactBackup);
      setFilteredContacts(contactBackup);
    }
  };
  const confirmDelete = (contactId, contactName) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className="p-4"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
          >
            <h2 style={{ color: YELLOW }}>Delete Contact</h2>
            <p
              style={{ color: FOREGROAND }}
            >{`Are you sure to delete ${contactName}?`}</p>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              No
            </button>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };

  const createContactForm = async (values) => {
    try {
      setLoading(true);
      const { status, data } = await createContact(values);
      console.log(data);
      if (status === 201) {
        toast.success("Contact Created Successfully!");
        setContacts((draft) => {
          draft.push(data);
        });
        setFilteredContacts((draft) => {
          draft.push(data);
        });
        setLoading(false);
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const contactSearch = _.debounce((query) => {
    console.log(query);
    if (!query) return setFilteredContacts([...contacts]);

    setFilteredContacts((draft) =>
      draft.filter(
        (c) =>
          c.firstname.toLowerCase().includes(query.toLowerCase()) ||
          c.lastname.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, 1000);

  return (
    <contactContext.Provider
      value={{
        loading,
        setLoading,
        contacts,
        setContacts,
        deleteContact: confirmDelete,
        groups,
        createContact: createContactForm,
        contactSearch,
        filteredContacts,
        setFilteredContacts,
      }}
    >
      <div className="app">
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />}></Route>
          <Route path="/contacts" element={<Contacts />}></Route>
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="contacts/:contactId" element={<ViewContact />} />
        </Routes>
      </div>
    </contactContext.Provider>
  );
}

export default App;
