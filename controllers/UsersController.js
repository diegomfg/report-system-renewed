const ResponseStrings = require("../constants/ResponseStrings")
const Response = require("../models/Response")
const User = require("../models/User")

module.exports = {
    /**
     * @todo Refactor into promise based functions
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     */
    findAll: async (req, res) => {
        try {
            const foundUser = await User.find({}).exec()
            res.status(200).send(new Response(ResponseStrings.SUCCESS, foundUser))
        } catch (error) {
            res.send(error.message)
        }
    },

    create: async (req, res) => {
        try {
            
            
            // let user = await User.create({
            //     username: req.body.username,
            //     password: req.body.password,
            //     role: req.body.role
            // })

            let user = await User.create(req.body)
            res.send(new Response(ResponseStrings.SUCCESS, {username: user?.username, id: user?.id, role: user?.role,}))
        } catch (error) {
            // Handle error for duplicated username keys
            if(error.code == 11000){
                res.send(new Response(ResponseStrings.ERROR, "Username already in use!"))
            } else {
                console.log(error)
                res.send(new Response(ResponseStrings.ERROR, error.message))
            }
        }
    },

    findByUsername: (req, res) => {
        User.findOne({
            username: req.params.username
        }).exec().then((user) => {
            if(user) {
                const {
                    username,
                    role,
                    _id
                } = user;
                res.send(new Response(ResponseStrings.SUCCESS, {username, role, _id}))
            } else return res.send(new Response(ResponseStrings.ERROR, `No record found with username: '${req.params.username}'`))
        }).catch((error) => res.send(new Response(ResponseStrings.ERROR, error.message)))
    },

    update: async (req, res) => {
        /**
         * @TODO Add support for profile images and descriptions
         */
        const id = req.params.id;
        // const user = await User.findOne({id}).exec();

        try {
            const updated = await User.updateOne({ id }, {...req.body})
            res.send(new Response(ResponseStrings.SUCCESS, updated))

        } catch (error) {
            res.send(new Response(ResponseStrings.ERROR, error.message))
        }
    },

    delete: (req, res) => {
        
        // delete by username instead?
        const { id } = req.params;

        User.deleteOne(id).exec()
        .then((deleted) => {
            res.send(new Response(ResponseStrings.SUCCESS, deleted))
        })
        .catch((error) => {
            console.log(error)
            res.send(new Response(ResponseStrings.ERROR, error.message))
        })
    }

}