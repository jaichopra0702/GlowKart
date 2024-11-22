const express = require('express');
const { registerUser, loginUser, myAccount, updateUserProfile, changeUserPassword } = require("../controllers/userController");
const {generateToken, validateToken} = require("../middlewares/jwtMiddleware");
const router = express.Router();
router.post("/registeruser", registerUser);

router.post("/loginuser", loginUser);

router.get("/myAccount",  validateToken, myAccount);

router.put("/myAccount", validateToken, updateUserProfile);

router.put("/password",  validateToken, changeUserPassword);

module.exports = router;
