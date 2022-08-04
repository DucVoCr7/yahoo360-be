import authenticationServices from '../services/authenticationServices'

const login = async (req, res) => {
    const data = await authenticationServices.login(req.body)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}

const register = async (req, res) => {
    const data = await authenticationServices.register(req.body)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}
const logout = async (req, res) => {
    if (!req.body.refreshToken) {
        return res.status(401).json({ message: 'You are not authenticated!' })
    }
    const data = await authenticationServices.logout(req.body.refreshToken)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}
module.exports = {
    login: login,
    register: register,
    logout: logout
}
