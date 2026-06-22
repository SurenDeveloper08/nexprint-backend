const About = require("../models/aboutModel");

exports.createOrUpdateAbout = async (
  req,
  res
) => {
  try {
    let about = await About.findOne();

    const image = req.file
      ? `${req.protocol}://${req.get(
          "host"
        )}/uploads/about/${req.file.filename}`
      : about?.image || "";

    if (about) {
      about = await About.findByIdAndUpdate(
        about._id,
        {
          ...req.body,
          image,
        },
        {
          new: true,
        }
      );
    } else {
      about = await About.create({
        ...req.body,
        image,
      });
    }

    res.status(200).json({
      success: true,
      about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAbout = async (
  req,
  res
) => {
  const about = await About.findOne({
    status: true,
  });

  res.status(200).json({
    success: true,
    about,
  });
};

exports.getAboutAdmin = async (
  req,
  res
) => {
  const about = await About.findOne();

  res.status(200).json({
    success: true,
    about,
  });
};