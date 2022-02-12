module.exports = {
    renderRegisterPage: (req, res) => {
       return res.render("register", {
           PageTitle: "Register"
       })
    }
}