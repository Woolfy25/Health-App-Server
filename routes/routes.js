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
} = require("../controllers/controller");

const { auth } = require("../middlewares/auth");

router.get("/account/verify/:verificationToken", verifyEmail); // Done
router.post("/account/verify/", verifyResend); // Done

router.get("/account/current", auth, getCurrentUser); // Done
router.get("/account/logout", auth, logOutAccount); // Done
router.post("/account/register", createAccount); // Done
router.post("/account/login", loginAccount); // Done
router.patch("/account/:accountId", auth, updateAccount); // Done

router.get("/meals", auth, getContacts);
router.post("/meals", auth, createContacts);
router.delete("/meals/:mealId", auth, removeContact);

router.delete("/account/:accountId", auth, removeAccount); // extra (not used) Done
router.put("/meals/:mealId", auth, updateContacts); // extra (not used)

module.exports = router;
