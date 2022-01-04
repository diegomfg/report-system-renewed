const User = require("../models/User")

module.exports = {
    /**
     * @todo Refactor into promise based functions
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     */
    all: async (req, res) => {
        try {
            res.send(await User.find({}).exec())
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
            
            res.send({username: user?.username, id: user?.id, role: user?.role,})
            
        } catch (error) {
            // Handle error for duplicated username keys
            if(error.code == 11000){
                res.status(504).send({message: "Error: Username is already in use"})
            } else res.send(error.message)
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

    update: async (req, res) => {
        /**
         * @TODO Add support for profile images and descriptions
         */
        const id = req.params.id;
        // const user = await User.findOne({id}).exec();
        
        try {

            const updated = await User.updateOne({id}, {...req.body})
            res.send({updated})

        } catch (error) {
            res.send(error.message)
        }
    },

    delete: (req, res) => {
        
        const { id } = req.params;

        User.deleteOne({id}).exec()
        .then((deleted) => res.send(deleted, {message: "deleted"}))
        .catch((error) => {
            console.log(error)
            res.send(error.message)
        })
    }

}