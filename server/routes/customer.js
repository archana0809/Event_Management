const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// 🔽 Multer setup (you can also move this to middleware/upload.js for reusability)
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// 🟩 Route to render the form
router.get('/add', customerController.addEvent);

// 🟦 Route to handle form submission with image upload
router.post('/add', upload.single('image'), customerController.postCustomer);

// 🟨 Other routes (optional)
router.get('/', customerController.homepage);
router.get('/edit/:id', customerController.editCustomer);
router.post('/edit/:id', upload.single('image'), customerController.updateCustomer);
router.get('/delete/:id', customerController.deleteCustomer);



// Add this line
router.get('/view/:id', customerController.viewCustomer);

module.exports = router;
