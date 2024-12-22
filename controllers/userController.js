const { v4:uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

//signup controller
const createUser = async (req, res) => {
    const body = req.body;
    if (!body.email || !body.password || !body.name) {
        return res.render("error", {
            errorMessage: "Name or Email or password is not present"
        })
    }
    const email = body.email;
    const password = body.password;
    const name = body.name;
    const user = await User.create({
        Name: name,
        Email: email,
        Password: password
    })
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    res.render("success", {
        message: "Wooho! User created successfully!"
    });
}

//login user controller
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.render("render", {
            message: "Oops! Email or Password is not present"
        })
    }
    const user = User.findOne({ email, password });
    if (!user) {
        return res.render("error", {
            message: "Oops! Email or password is not correct"
        })
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    return res.render("success", {
        message: "Wooho! Login successful!"
    });
}

module.exports = {
    createUser,
    loginUser
}