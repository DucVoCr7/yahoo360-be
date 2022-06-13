import apiLikesServices from '../services/apiLikesServices'

const actionLike = async (req, res) => {
    const data = await apiLikesServices.actionLike(req.body, req.userIdToken)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}

module.exports = {
    actionLike: actionLike
}