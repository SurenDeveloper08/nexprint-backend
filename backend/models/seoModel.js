const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      unique: true,
    },

    metaTitle: String,
    metaDescription: String,
    metaKeywords: String,
    canonicalUrl: String,

    ogTitle: String,
    ogDescription: String,
    ogImage: String,

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Seo", seoSchema);