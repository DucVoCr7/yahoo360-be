import apiServices from '../services/apiServices'

const login = async (req, res) => {
    if(!req.body.email && !req.body.password) {
        return res.status(400).json({
            mesErrEmail: 'Please enter your email!',
            mesErrPassword: 'Please enter your password!'
        })
    } else if(!req.body.email) {
        return res.status(400).json({
            mesErrEmail: 'Please enter your email!'
        })
    } else if(!req.body.password) {
        return res.status(400).json({
            mesErrPassword: 'Please enter your password!'
        })
    } else {
        const data = await apiServices.handleLogin(req.body.email, req.body.password)
        return res.status(200).json({
            ...data
        })
    }
}
module.exports =  {
    login: login,
}
