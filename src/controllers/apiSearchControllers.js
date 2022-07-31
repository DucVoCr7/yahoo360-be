import apiSearchServices from '../services/apiSearchServices'

const searchPostTitle = async (req, res) => {
    const data = await apiSearchServices.searchPostTitle(req.query.title)
    return res.status(200).json(data)
}
const searchUserEmail = async (req, res) => {
    const data = await apiSearchServices.searchUserEmail(req.query.email)
    return res.status(200).json(data)
}


module.exports = {
    searchPostTitle: searchPostTitle,
    searchUserEmail: searchUserEmail,
}