const express = require('express');
const multer = require('multer');
const path = require('path')

const {
  createBlog,
  updateBlog,
  deleteBlog,
  toggleBlogStatus,
  getAllBlogsAdmin,
  getSingleBlogAdmin,
  getWebsiteBlogs,
  getBlogBySlug,
} = require('../controllers/blogController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // store files inside /uploads/product
    cb(null, path.join(__dirname, '..', 'uploads/blog'));
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

//Web routes
router.route('/blogs').get(getWebsiteBlogs)
router.route('/blog/:slug').get(getBlogBySlug);

//Admin routes
router.route('/admin/blog').post(
  // isAuthenticatedUser, authorizeRoles('admin'), 
  upload.single('image'), createBlog);

router.route('/admin/blog/:id').put(
  // isAuthenticatedUser, authorizeRoles('admin'), 
  upload.single('image'), updateBlog);


router.route('/admin/blog/status/:id').put(
  // isAuthenticatedUser, authorizeRoles('admin'), 
  upload.single('image'), toggleBlogStatus);

router.route('/admin/blog/:id').get(
  // isAuthenticatedUser, authorizeRoles('admin'), 
  getSingleBlogAdmin);

router.route('/admin/blogs').get(
  // isAuthenticatedUser, authorizeRoles('admin'), 
  getAllBlogsAdmin);

router.route('/admin/blog/:id').delete(
  // isAuthenticatedUser, authorizeRoles('admin'),
  deleteBlog);


module.exports = router;    