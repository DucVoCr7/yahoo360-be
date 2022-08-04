import apiAdminServices from '../services/apiAdminServices'

const readAllUser = async (req, res) => {
    const data = await apiAdminServices.readAllUser(req.userIdToken)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}
const logoutUser = async (req, res) => {
    const data = await apiAdminServices.logoutUser(req.params.id, req.userIdToken)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}
const deleteUser = async (req, res) => {
    const data = await apiAdminServices.deleteUser(req.params.id, req.userIdToken)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}
module.exports = {
    readAllUser: readAllUser,
    logoutUser: logoutUser,
    deleteUser: deleteUser
}