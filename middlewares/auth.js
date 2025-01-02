const { getUser } = require("../service/auth")

async function authenticateUser(req, res, next) {
    //return to login page if userUID is not present in the cookies
    if (!req.cookies || !req.cookies.uid) return res.redirect("/login");
    const userUID = req.cookies.uid;

    //return to login page if user is not present in the cookies
    if (!getUser(userUID)) return res.redirect("/login");
    const user = getUser(userUID);
    req.user = user;
    next();
}

async function restrictToAdmin(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "You are not allowed to access this route"
        });
    }
    next();
}

module.exports = {
    restrictToAdmin,
    authenticateUser
}