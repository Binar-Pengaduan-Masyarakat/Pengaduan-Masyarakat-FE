const express = require('express');
const userController = require('../controllers/userController');
const multer = require('multer');
const router = express.Router();

router.get('/:userId', userController.getUserProfile);
router.post('/', userController.createUserProfile);
router.put('/:userId', userController.updateUserProfile);
router.delete('/:userId', userController.deleteUserProfile);

// Set up storage engine using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`); // Generate unique file name
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Route for file upload
  router.post('/:id/upload', upload.single('file'), userController.uploadUserMedia);


module.exports = router;
