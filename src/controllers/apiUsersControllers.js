import apiUsersServices from '../services/apiUsersServices'

const updateUser = async (req, res) => {
    const data = await apiUsersServices.updateUser(req.params.id, req.body, req.userIdToken, req.files.image?.filepath)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}
module.exports = {
    updateUser: updateUser
}