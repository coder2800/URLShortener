const User = require("../models/user");
const { setUser } = require("../service/auth");


//signup controller
const createUser = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        if (!body.email || !body.password || !body.name) {
            return res.render("error", {
                errorMessage: "Name or Email or Password is not present"
            })
        }
        const email = body.email;
        const password = body.password;
        const name = body.name;
        const role = body.role || "normal";
        const profilePhotoPath = req.file ? req.file.path : "";
        const user = await User.create({
            Name: name,
            Email: email,
            Password: password,
            Role: role,
            ProfilePhoto: profilePhotoPath
        })
        const token = setUser(user);
        res.cookie('uid', token);
        return res.render("success", {
            message: "Wooho! User created successfully!"
        });
    }
    catch(error){
        return res.render("error", {
            errorMessage: error.message
        })
    }
}

//login user controller
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.render("error", {
                errorMessage: "Oops! Email or Password is not present"
            })
        }
        const user = await User.findOne({ Email: email, Password: password });
        if (!user) {
            return res.render("error", {
                errorMessage: "Oops! Email or password is not correct"
            })
        }
        const token = setUser(user);
        res.cookie('uid', token);
        return res.render("success", {
            message: "Wooho! Login successful!"
        });
    }
    catch(error){
        return res.render("error", {
            errorMessage: error.message
        })
    }
}

module.exports = {
    createUser,
    loginUser
}