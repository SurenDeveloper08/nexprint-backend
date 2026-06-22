const Seo = require("../models/seoModel");


// CREATE SEO
exports.createSeo = async (req, res) => {
  try {

    const existingSeo = await Seo.findOne({
      page: req.body.page,
    });

    if (existingSeo) {
      return res.status(400).json({
        success: false,
        message: "SEO already exists for this page",
      });
    }


    const seo = await Seo.create(req.body);


    res.status(201).json({
      success: true,
      seo,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// UPDATE SEO
exports.updateSeo = async (req, res) => {
  try {


    const seo = await Seo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );


    if (!seo) {
      return res.status(404).json({
        success: false,
        message: "SEO not found",
      });
    }


    res.status(200).json({
      success: true,
      seo,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// DELETE SEO
exports.deleteSeo = async (req, res) => {
  try {


    const seo = await Seo.findById(
      req.params.id
    );


    if (!seo) {
      return res.status(404).json({
        success: false,
        message: "SEO not found",
      });
    }


    await seo.deleteOne();


    res.status(200).json({
      success: true,
      message: "SEO deleted successfully",
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





// ACTIVE / INACTIVE
exports.toggleSeoStatus = async (req, res) => {
  try {


    const seo = await Seo.findById(
      req.params.id
    );


    if (!seo) {
      return res.status(404).json({
        success: false,
        message: "SEO not found",
      });
    }


    seo.status = !seo.status;


    await seo.save();


    res.status(200).json({
      success: true,
      status: seo.status,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





// ADMIN ALL SEO
exports.getAllSeoAdmin = async (req, res) => {
  try {


    const seo = await Seo.find()
      .sort({
        createdAt: -1,
      });


    res.status(200).json({
      success: true,
      seo,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





// ADMIN SINGLE SEO
exports.getSingleSeoAdmin = async (req, res) => {
  try {


    const seo = await Seo.findById(
      req.params.id
    );


    if (!seo) {
      return res.status(404).json({
        success: false,
        message: "SEO not found",
      });
    }


    res.status(200).json({
      success: true,
      seo,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





// WEBSITE SEO
exports.getSeoByPage = async (req, res) => {
  try {
    const seo = await Seo.findOne({
      page: req.params.page.toLowerCase(),
      status: true,
    })
      .select(
        "metaTitle metaDescription metaKeywords canonicalUrl ogTitle ogDescription ogImage twitterTitle twitterDescription twitterImage"
      );


    if (!seo) {
      return res.status(404).json({
        success: false,
        message: "SEO not found",
      });
    }


    res.status(200).json({
      success: true,
      seo,
    });



  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};