const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/error");

dotenv.config({
  path: path.join(__dirname, "config/config.env"),
});

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://www.nexprint.ae",
      "https://nexprint.ae",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("trust proxy", true);

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use("/api/v1/", require("./routes/product"));
app.use("/api/v1/", require("./routes/category"));
app.use("/api/v1/", require("./routes/subCategory"));
app.use("/api/v1/", require("./routes/brand"));
app.use("/api/v1/", require("./routes/hero"));
app.use("/api/v1/", require("./routes/service"));
app.use("/api/v1/", require("./routes/auth"));
app.use("/api/v1/", require("./routes/banner"));
app.use("/api/v1/", require("./routes/ad"));
app.use("/api/v1/", require("./routes/poster"));
app.use("/api/v1/", require("./routes/season"));
app.use("/api/v1/", require("./routes/subscribe"));
app.use("/api/v1/", require("./routes/cart"));
app.use("/api/v1/", require("./routes/order"));
app.use("/api/v1/", require("./routes/dashboard"));
app.use("/api/v1/", require("./routes/ProductHighlight"));
app.use("/api/v1/", require("./routes/seo"));
app.use("/api/v1/", require("./routes/review"));
app.use("/api/v1/", require("./routes/gccCountry"));
app.use("/api/v1/", require("./routes/blog"));
app.use("/api/v1/", require("./routes/ip"));
app.use("/api/v1/", require("./routes/contact"));
app.use("/api/v1/", require("./routes/page"));

app.use("/", require("./routes/sitemap"));

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../frontend/build");

  app.use(express.static(buildPath));

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// Error middleware MUST be last
app.use(errorMiddleware);

module.exports = app;