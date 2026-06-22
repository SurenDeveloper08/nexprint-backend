const express = require('express');
const multer = require('multer');
const path = require('path')
const router = express.Router();
const {
    getAbout,
    getAboutAdmin,
    createOrUpdateAbout
} = require('../controllers/aboutController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // store files inside /uploads/product
        cb(null, path.join(__dirname, '..', 'uploads/about'));
    },
    filename: function (req, file, cb) {
        // get extension
        const ext = path.extname(file.originalname).toLowerCase();

        // get base name without extension
        const baseName = path.basename(file.originalname, ext);

        // sanitize base name (remove spaces and special characters)
        const safeName = baseName
            .trim()
            .replace(/\s+/g, '_')        // spaces to underscores
            .replace(/[^a-zA-Z0-9_-]/g, ''); // only keep safe chars

        // add timestamp to avoid collisions
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

        // final filename
        const finalName = `${safeName}_${uniqueSuffix}${ext}`;
        cb(null, finalName);
    },
});

// Create the multer upload instance
const upload = multer({ storage });

router.route('/about').get(getAbout);

router.route('/admin/about').get(getAboutAdmin);

router.route('/admin/about').post(
    upload.single('image'),
    createOrUpdateAbout
);

module.exports = router;