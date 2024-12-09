const express = require("express");
const {
  createUrl,
  getUrl,
  getAnalytics,
} = require("../controllers/urlController");
const router = express.Router();
const URL = require("../models/url");

router.post("/", createUrl);

router.get("/:shortId", getUrl);

router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
