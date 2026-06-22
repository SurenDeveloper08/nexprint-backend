const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    unique: true,
  },

  shortDescription: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  imageAlt: {
    type: String,
    default: "",
  },

  category: String,

  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,

  status: {
    type: Boolean,
    default: true,
  },

  featured: {
    type: Boolean,
    default: false,
  },

  views: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true,
}
);

blogSchema.pre("save", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);