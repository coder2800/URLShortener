const express = require("express")
const router = express.Router();
const { createUser, loginUser } = require("../controllers/userController")
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      return cb(null, './uploads/'); // Directory to save files
    },
    filename: (req, file, cb) => {
      return cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    },
});

const upload = multer({ storage });

router.post("/", upload.single('profilePhoto'), createUser);

router.post("/login", loginUser);

module.exports = router;