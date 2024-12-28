const URL = require("../models/url");
const shortId = require("shortid");

const createUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).render("error", {
      errorMessage: "URL is not present"
  });
  const url = body.url;
  const shortid = shortId();

  console.log("Creating", req.user);
  const urlObj = await URL.create({
    shortId: shortid,
    redirectUrl: url,
    visitHistory: [],
    createdBy: req.user.id
  });
  return res.render("home", {
    id: shortid,
  });
};

const getUrl = async (req, res) => {
  try {
    const id = req.params.shortId;
    const url = await URL.findOneAndUpdate(
      {
        shortId: id,
      },
      {
        $push: {
          visitHistory: {
            timestamps: Date.now(),
          },
        },
      }
      );
      if (!url) {
          return res.render("error", {
              errorMessage: "Either the short URL is not valid or the URL for which this short URL has been generated is incorrect"
          });
    }
    return res.redirect(url.redirectUrl);
  } catch (err) {
    console.log(err);
  }
};

const getAnalytics = async (req, res) => {
    const id = req.params.shortId;
    const url = await URL.findOne({
      shortId: id,
      createdBy: req.user.id
    });
    if (!url) {
        return res.status(400).render("error", {
            errorMessage: "URL not found"
        })
    }
    return res.render("analytics", {
        GeneratedUrl: url.shortId,
        OriginalURL: url.redirectUrl,
        visits: url.visitHistory.length
    });
};

module.exports = {
  createUrl,
  getUrl,
  getAnalytics,
};