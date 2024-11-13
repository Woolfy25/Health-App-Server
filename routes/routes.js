const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/controler");

const { auth } = require("../middlewares/auth");

router.get("/account/verify/:verificationToken", verifyEmail);
router.post("/account/verify/", verifyResend);

router.get("/account/current", auth, getCurrentUser);
router.get("/account/logout", auth, logOutAccount);
router.post("/account/register", createAccount);
router.post("/account/login", loginAccount);
router.put("/account/:contactId", auth, updateAccount); // extra (not used)
router.delete("/account/:contactId", auth, removeAccount); // extra (not used)

router.get("/elements", auth, getContacts);
router.post("/elements", auth, createContacts);
router.put("/elements/:contactId", auth, updateContacts);
router.delete("/elements/:contactId", auth, removeContact);

module.exports = router;
