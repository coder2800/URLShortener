require("dotenv").config();
const jwt = require("jsonwebtoken")

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function setUser(user) {
    return jwt.sign(
        {
            id: user._id,
            name: user.Name,
            email: user.Email,
            role: user.Role
        },
        JWT_SECRET_KEY
    )
}

function getUser(token) {
    try {
        return jwt.verify(token, JWT_SECRET_KEY);
    }
    catch {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}