
const Blog = require("../models/blogModel");
const slugify = require("slugify");

exports.createBlog = async (req, res) => {
  try {
    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/blog/${req.file.filename}`
      : "";

    const blog = await Blog.create({
      title: req.body.title,
      slug: slugify(req.body.title, {
        lower: true,
        strict: true,
      }),

      shortDescription: req.body.shortDescription,
      content: req.body.content,

      image,
      imageAlt: req.body.imageAlt,

      category: req.body.category,

      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      metaKeywords: req.body.metaKeywords,

      featured: req.body.featured || false,
      status: req.body.status ?? true,
    });

    res.status(201).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| UPDATE BLOG
|--------------------------------------------------------------------------
*/
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (req.file) {
      blog.image = `${req.protocol}://${req.get(
        "host"
      )}/uploads/blog/${req.file.filename}`;
    }

    if (req.body.title) {
      blog.title = req.body.title;

      blog.slug = slugify(req.body.title, {
        lower: true,
        strict: true,
      });
    }

    blog.shortDescription =
      req.body.shortDescription ??
      blog.shortDescription;

    blog.content =
      req.body.content ??
      blog.content;

    blog.imageAlt =
      req.body.imageAlt ??
      blog.imageAlt;

    blog.category =
      req.body.category ??
      blog.category;

    blog.metaTitle =
      req.body.metaTitle ??
      blog.metaTitle;

    blog.metaDescription =
      req.body.metaDescription ??
      blog.metaDescription;

    blog.metaKeywords =
      req.body.metaKeywords ??
      blog.metaKeywords;

    if (req.body.featured !== undefined) {
      blog.featured = req.body.featured;
    }

    if (req.body.status !== undefined) {
      blog.status = req.body.status;
    }

    await blog.save();

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE BLOG
|--------------------------------------------------------------------------
*/
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| ACTIVE / INACTIVE
|--------------------------------------------------------------------------
*/
exports.toggleBlogStatus = async (
  req,
  res
) => {
  try {
    const blog = await Blog.findById(
      req.params.id
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.status = !blog.status;

    await blog.save();

    res.status(200).json({
      success: true,
      status: blog.status,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| FEATURED / UNFEATURED
|--------------------------------------------------------------------------
*/
exports.toggleFeaturedBlog = async (
  req,
  res
) => {
  try {
    const blog = await Blog.findById(
      req.params.id
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.featured = !blog.featured;

    await blog.save();

    res.status(200).json({
      success: true,
      featured: blog.featured,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| ADMIN BLOG LIST
|--------------------------------------------------------------------------
*/
exports.getAllBlogsAdmin = async (
  req,
  res
) => {
  try {
    const blogs = await Blog.find()
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| ADMIN SINGLE BLOG
|--------------------------------------------------------------------------
*/
exports.getSingleBlogAdmin =
  async (req, res) => {
    try {
      const blog =
        await Blog.findById(
          req.params.id
        );

      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }

      res.status(200).json({
        success: true,
        blog,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

/*
|--------------------------------------------------------------------------
| WEBSITE BLOG LIST
|--------------------------------------------------------------------------
*/
exports.getWebsiteBlogs =
  async (req, res) => {
    try {
      const page =
        Number(req.query.page) || 1;

      const limit = 9;

      const skip =
        (page - 1) * limit;

      const total =
        await Blog.countDocuments({
          status: true,
        });

      const blogs =
        await Blog.find({
          status: true,
        })
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit);

      res.status(200).json({
        success: true,
        total,
        page,
        pages: Math.ceil(
          total / limit
        ),
        blogs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

/*
|--------------------------------------------------------------------------
| FEATURED BLOGS
|--------------------------------------------------------------------------
*/
exports.getFeaturedBlogs =
  async (req, res) => {
    try {
      const blogs =
        await Blog.find({
          status: true,
          featured: true,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        blogs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

/*
|--------------------------------------------------------------------------
| BLOG DETAILS BY SLUG
|--------------------------------------------------------------------------
*/
exports.getBlogBySlug =
  async (req, res) => {
    try {
      const blog =
        await Blog.findOne({
          slug: req.params.slug,
          status: true,
        });

      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }

      await Blog.findByIdAndUpdate(
        blog._id,
        {
          $inc: {
            views: 1,
          },
        }
      );

      res.status(200).json({
        success: true,
        blog,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

