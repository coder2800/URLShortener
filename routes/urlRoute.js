const express = require("express");
const {
  createUrl,
  getUrl,
  getAnalytics,
} = require("../controllers/urlController");
const router = express.Router();
const URL = require("../models/url");
const { restrictToAdmin } = require("../middlewares/auth");

router.post("/", createUrl);

router.get("/analytics/:shortId", restrictToAdmin, getAnalytics);

router.get("/:shortId", getUrl);

module.exports = router;
