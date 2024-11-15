const express = require("express");
const router = express.Router();
const {
  createAccount,
  loginAccount,
  logOutAccount,
  removeAccount,
  updateAccount,
  getMeals,
  createMeals,
  removeMeal,
  getCurrentUser,
  verifyEmail,
  verifyResend,
  getIngredients,
} = require("../controllers/controller");

const { auth } = require("../middlewares/auth");

router.get("/account/verify/:verificationToken", verifyEmail); // * Done
router.post("/account/verify/", verifyResend); // * Done

router.get("/account/current", auth, getCurrentUser); // * Done
router.get("/account/logout", auth, logOutAccount); // * Done
router.post("/account/register", createAccount); // * Done
router.post("/account/login", loginAccount); // * Done
router.patch("/account/:accountId", auth, updateAccount); //  * Done

router.get("/ingredients", auth, getIngredients); // * Done

router.get("/meals", auth, getMeals); // TODO To Do
router.post("/meals", auth, createMeals); // TODO To Do
router.delete("/meals/:mealId", auth, removeMeal); // TODO To Do

router.delete("/account/:accountId", auth, removeAccount); // ! extra (not used) Done

module.exports = router;
