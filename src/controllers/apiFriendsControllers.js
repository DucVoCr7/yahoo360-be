import apiFriendsServices from '../services/apiFriendsServices'
const sentRequest = async (req, res) => {
    const data = await apiFriendsServices.sentRequest(req.body, req.userIdToken)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}
const removeRequest = async (req, res) => {
    const data = await apiFriendsServices.removeRequest(req.params.id, req.userIdToken)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}
const acceptRequest = async (req, res)=> {
    const data = await apiFriendsServices.acceptRequest(req.params.id, req.userIdToken)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}

const refuseRequest = async (req, res) => {
    const data = await apiFriendsServices.refuseRequest(req.params.id, req.userIdToken)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}

const deleteFriend = async (req, res) => {
    const data = await apiFriendsServices.deleteFriend(req.params.id, req.userIdToken)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}
module.exports = {
    removeRequest: removeRequest,
    sentRequest: sentRequest,
    acceptRequest: acceptRequest,
    refuseRequest: refuseRequest,
    deleteFriend: deleteFriend
}