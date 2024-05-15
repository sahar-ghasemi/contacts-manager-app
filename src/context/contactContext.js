import { createContext } from "react";

export const contactContext = createContext({
  loading: false,
  setLoading: () => {},
  contacts: [],
  setContacts: () => {},
  groups: [],
  getContact: () => {},
  contact: {},
  setContact: () => {},
  deleteContact: () => {},
  createContact: () => {},
  contactSearch: () => {},
  filteredContacts: [],
  setFilteredContacts: () => {},
});
