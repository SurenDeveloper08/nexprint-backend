const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    subtitle: String,

    description: {
      type: String,
      required: true,
    },

    image: String,

    vision: String,

    mission: String,

    experienceYears: {
      type: Number,
      default: 0,
    },

    customersServed: {
      type: Number,
      default: 0,
    },

    printersInstalled: {
      type: Number,
      default: 0,
    },

    supportAvailable: {
      type: String,
      default: "24/7",
    },

    metaTitle: String,
    metaDescription: String,
    metaKeywords: String,

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "About",
  aboutSchema
);