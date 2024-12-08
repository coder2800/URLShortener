const URL = require("../models/user");
const shortId = require("shortid");

const createUrl = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json("URL is not present");
    const url = body.url;
    const shortid = shortId();
    const urlObj = await URL.create({
        shortId: shortid,
        redirectUrl: url,
        visitHistory: []
    })
    return res.render("home", {
        id: shortid
    })
    // return res.json({shortid: shortid});
};

const getUrl = async (req, res) => {
    try {
        const id = req.params.shortId;
        const url = await URL.findOneAndUpdate({
            shortId: id
        }, {
            $push: {
                visitHistory: {
                    timestamps: Date.now()
                }
            }
        })
        res.redirect(url.redirectUrl);
    }
    catch(err){
        console.log(err);
    }

};

const getAnalytics = async (req, res) => {
        const id = req.params.shortId;
        const url = await URL.findOne({
            shortId: id
        })
        console.log(url);
        return res.json({visits: url.visitHistory.length});
};

module.exports = {
    createUrl,
    getUrl,
    getAnalytics
}