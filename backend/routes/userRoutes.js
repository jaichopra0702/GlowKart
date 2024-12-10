const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  myAccount,
  updateUserProfile,
  changeUserPassword,
} = require('../controllers/userController');
const {
  generateToken,
  validateToken,
} = require('../middlewares/jwtMiddleware');
const contactController = require('../controllers/contactController');
const router = express.Router();
router.post('/registeruser', registerUser);

router.post('/loginuser', loginUser);

router.post('/logout', validateToken, logoutUser);

router.get('/myAccount', validateToken, myAccount);

router.put('/myAccount', validateToken, updateUserProfile);

router.put('/password', validateToken, changeUserPassword);

router.post('/contact', contactController.submitContactForm);
module.exports = router;