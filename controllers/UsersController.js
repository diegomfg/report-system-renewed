const { Mongoose } = require("mongoose")
const ResponseStrings = require("../constants/ResponseStrings")
const Response = require("../models/Response")
const User = require("../models/User")

module.exports = {
    
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
               return res.send(new Response(ResponseStrings.ERROR, "Username already in use!"))
            } else {
                
                for(const [key, value] of Object.entries(error.errors)){
                    if(key == 'role'){
                       return res.send(new Response(ResponseStrings.ERROR, "Invalid value for option role"))
                    }
                }

                return res.send(new Response(ResponseStrings.ERROR, error.message))
            }
        }
    },

    findByUsername: async (req, res) => {

        console.log(req.params)

        try {
            const user = await User.findOne({username: req.params.username});
            
            const {username, role, _id} = user;
            res.send(new Response(ResponseStrings.SUCCESS, {username, role, _id}))
        } catch (error) {
            res.send(new Response(ResponseStrings.ERROR, error.message));
        }

    },

    update: async (req, res) => {
       
        const { user_id } = req.params;

        console.log('body to update: ', {...req.body})

        /**
         * @todo refactor into async await
         * How to do the $set thing? New passwords are not being hashed
         */
        User.findOneAndUpdate({id: user_id}, req.body).then((updated) => {
            return res.send(new Response(ResponseStrings.SUCCESS, updated))
        })
        .catch((error) => {
            console.log(error.message)
            return res.send(new Response(ResponseStrings.ERROR, error.message))
        })
    },

    delete: async (req, res) => {
        
        
        const { user_id } = req.params;
        

        try {
            // const found_user = await User.findById(user_id);
            // console.log(`Found this one: ${found_user}`)

            const user = await User.findById(user_id);
            if(user == null){
                return res.send(new Response(ResponseStrings.ERROR, `Couldn't find any user with id: ${user_id}`))
            }
            // const deleted = await Report.deleteOne({_id: id});
            const deleted = await User.deleteOne({_id: user_id})
            // const deleted = await User.findByIdAndDelete(user_id);
            return res.send(new Response(ResponseStrings.SUCCESS, deleted))

        } catch (e) {
            console.log(e.message)
            res.send(new Response(ResponseStrings.ERROR, e.message))
        }
    }

}