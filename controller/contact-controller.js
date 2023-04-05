const Contact = require("../models/contacts");
const createPath = require("../helpers/create-path");

const handleError = (req, error) => {
  console.log(error);
  req.render(createPath("error"), { title: "Error" });
};

const getContact = (res, req) => {
  const title = "Contacts";
  Contact.find()
    .then((contacts) => req.render(createPath("contacts"), { contacts, title }))
    .catch((error) => handleError(req, error));
};


module.exports = {
  getContact
};
