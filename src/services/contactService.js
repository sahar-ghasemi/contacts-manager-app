import axios from "axios";

const SERVER_URL = "http://localhost:9001";

// @desc Get All Contacts
// @route GET http://localhost:9001/contacts
export const getAllContacts = () => {
  const url = `${SERVER_URL}/contacts`;
  return axios.get(url);
};

// @desc Get Contact With Contact ID
// @route GET http://localhost:9001/contacts/:contactId
export const getContactById = (contactId) => {
  const url = `${SERVER_URL}/contacts/${contactId}`;
  return axios.get(url);
};

// @desc  Create New Contact
// @route POST http://localhost:9001/contacts
export const createContact = (contact) => {
  const url = `${SERVER_URL}/contacts`;
  return axios.post(url, contact);
};

// @desc  Update Contact
// @route PUT http://localhost:9001/contacts/:contactId
export const updateContact = (contactId, contact) => {
  const url = `${SERVER_URL}/contacts/${contactId}`;
  return axios.put(url, contact);
};

// @desc  Delete Contact
// @route DELETE http://localhost:9001/contacts/:contactId
export const deleteContact = (contactId) => {
  const url = `${SERVER_URL}/contacts/${contactId}`;
  return axios.delete(url);
};

// @desc  Get All Groups
// @route GET http://localhost:9001/groups
export const getAllGroups = () => {
  const url = `${SERVER_URL}/groups`;
  return axios.get(url);
};
// @desc  Get Group Name With Group ID
// @route GET http://localhost:9000/groups/:groupId
export const getGroupById = (groupId) => {
  const url = `${SERVER_URL}/groups/${groupId}`;
  return axios.get(url);
};
