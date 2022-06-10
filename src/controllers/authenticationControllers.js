import authenticationServices from '../services/authenticationServices'

const login = async (req, res) => {
    const errors = authenticationServices.handleDataReqErr('login', req.body)
    if (Object.keys(errors).length === 0) {
        const data = await authenticationServices.handleLogin(req.body.email, req.body.password)
        return res.status(200).json(data)
    }
    return res.status(400).json(errors)
}

const register = async (req, res) => {
    const errors = authenticationServices.handleDataReqErr('register', req.body)
    if (Object.keys(errors).length === 0) {
        const data = await authenticationServices.handleRegister(req.body.name, req.body.email, req.body.password)
        return res.status(200).json(data)
    }
    return res.status(400).json(errors)
}

module.exports =  {
    login: login,
    register: register
}
