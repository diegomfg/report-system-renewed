const User = require("../models/User")

module.exports = {

    create: (req, res) => {
        try {
            let user = await User.create({
                username: req.body.username,
                password: req.body.password,
                role: req.body.role
            })
            console.log(user);
            res.send(user)
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    },

    getByUsername: (req, res) => {
        User.findOne({
            username: req.params.username
        }).exec().then((user) => {

            const {
                username,
                role,
                _id
            } = user;
            res.send({
                username,
                role,
                _id
            })

        }).catch((error) => res.send(error.message))
    },

    update: (req, res) => {
        res.send("update!")
    }

}