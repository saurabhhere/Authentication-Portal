const router = require('express').Router();
const auth = require('../middleware/auth');
const {register, login, activateAccount, deleteUser, checkToken, getUser, getProfile, getAllUsers, forgotPassword, resetPassword} = require('../controllers/User');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        return cb(res.status(400).end('Only jpeg, jpg, png are allowed', false));
    }
}

const upload = multer({ storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
}, fileFilter: fileFilter});


router.post('/register', upload.single("registerImage"), register);
router.post("/login", login);
router.post('/email-activate', activateAccount)
router.delete("/delete", auth, deleteUser);
router.post("/tokenIsValid", checkToken);
router.get("/", auth, getUser);
router.get("/profile/:id", getProfile);
router.get("/all", getAllUsers);
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

module.exports = router;