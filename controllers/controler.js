const services = require("../services/services");
require("dotenv").config();

const getCurrentUser = async (req, res, next) => {
  try {
    const { email, userName } = req.user;
    res.status(200).json({
      status: "Succes",
      code: 200,
      data: { email, userName },
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

const logOutAccount = async (req, res, next) => {
  try {
    const userId = req.user._id;
    await services.logOutAccount(userId);
    res.status(204).json({
      status: "Succes",
      code: 204,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

const createAccount = async (req, res, next) => {
  try {
    const { email, password, userName } = req.body;
    const result = await services.createAccount({
      email,
      password,
      userName,
    });

    res.status(201).json({
      status: "Succes",
      code: 201,
      data: {
        email: result.email,
        token: result.token,
        userName: result.userName,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

const loginAccount = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await services.checkUserDB({
      email,
      password,
    });

    res.status(201).json({
      status: "Succes",
      code: 201,
      data: { email: result.email, token: result.token },
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

const updateAccount = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateData = req.body;
    const result = await services.updateAccount(contactId, updateData);
    res.status(201).json({
      status: "Succes",
      code: 201,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      code: 404,
    });
  }
};

const removeAccount = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await services.deleteAccount(contactId);
    res.status(204).json({
      status: "Succes",
      code: 204,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      code: 404,
    });
  }
};

const getContacts = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const result = await services.getAllContacts(ownerId);
    res.json({
      status: "Succes",
      code: 201,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

const createContacts = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    ownerId = req.user._id;
    const result = await services.addContact({ name, email, phone, ownerId });
    res.json({
      status: "Succes",
      code: 201,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

const updateContacts = async (req, res, next) => {
  try {
    ownerId = req.user._id;
    const { contactId } = req.params;
    const updateData = req.body;
    const result = await services.updateContact(contactId, updateData, ownerId);
    res.status(201).json({
      status: "Succes",
      code: 201,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

const removeContact = async (req, res, next) => {
  try {
    ownerId = req.user._id;
    const { contactId } = req.params;
    await services.deleteContact(contactId, ownerId);
    res.status(204).json();
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    await services.verifyEmailAddress(verificationToken);
    res.status(200).json({
      message: "Email verificat cu success!",
      code: 200,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

const verifyResend = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!req.body) {
      return res.status(400).json({
        message: "missing required field email",
        status: 400,
      });
    }

    await services.verifyEmailResend(email);
    res.status(200).json({
      message: "Verification email sent!",
      code: 200,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

module.exports = {
  createAccount,
  loginAccount,
  logOutAccount,
  removeAccount,
  updateAccount,
  getContacts,
  createContacts,
  updateContacts,
  removeContact,
  getCurrentUser,
  verifyEmail,
  verifyResend,
};
