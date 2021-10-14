const router = require('express').Router();
const auth = require('../middleware/auth');
const {register, login, activateAccount, deleteUser, checkToken, getUser, getProfile, updateProfile, getAllUsers} = require('../controllers/User');


router.post('/register', register);
router.post("/login", login);
router.post('/email-activate', activateAccount)
router.delete("/delete", auth, deleteUser);
router.post("/tokenIsValid", checkToken);
router.get("/", auth, getUser);
router.get("/profile/:id", getProfile);
router.put("/profile/:id", updateProfile);
router.get("/all", getAllUsers);

module.exports = router;