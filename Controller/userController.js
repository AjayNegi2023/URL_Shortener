const User = require("../Models/User");
const {
    v4: uuidv4
} = require("uuid");
const {
    setUser
} = require("../Service/auth");
const handleSignup = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    console.log(name);
    await User.create({
        name,
        email,
        password
    });

    return res.redirect("/");

}
const handleSignin = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const user = await User.findOne({
        email,
        password
    })
    // console.log(user.name)


    if (!user) {
        return res.render("login", {
            msg: "Wrong Email or Password "
        })
    }
    const sessionId = uuidv4();
    console.log(sessionId)
    //Maintain Serever Diary
    setUser(sessionId, user);
    res.cookie("uuid", sessionId);
    return res.redirect("/");

}

module.exports = {
    handleSignup,
    handleSignin
}