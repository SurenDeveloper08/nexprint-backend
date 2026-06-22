const express = require("express");

const router = express.Router();

const {
  createSeo,
  updateSeo,
  deleteSeo,
  toggleSeoStatus,
  getAllSeoAdmin,
  getSingleSeoAdmin,
  getSeoByPage,
} = require("../controllers/seoController");

// Admin
router.route("/admin/seo/new").post(createSeo);

router.route("/admin/seo/all").get(
  getAllSeoAdmin
);

router.route("/admin/seo/:id").get(
  getSingleSeoAdmin
);

router.route("/admin/seo/:id").put(
  updateSeo
);

router.route("/admin/seo/:id").delete(
  deleteSeo
);

router.route(
  "/admin/seo/status/:id"
).patch(toggleSeoStatus);

// Website
router.route("/seo/:page").get(
  getSeoByPage
);

module.exports = router;