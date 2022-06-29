import apiPagesServices from '../services/apiPagesServices'

const postsPage = async (req, res) => {
    const data = await apiPagesServices.postsPage(req.query.category)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}
const communityPage = async (req, res) => {
    const data = await apiPagesServices.communityPage()
    return res.status(200).json(data)
}
const userPage = async (req, res) => {
    const data = await apiPagesServices.userPage(req.params.id)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}
const homePage = async (req, res)=> {
    const data = await apiPagesServices.homePage(req.params.id, req.userIdToken)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}
module.exports = {
    postsPage: postsPage,
    communityPage: communityPage,
    userPage: userPage,
    homePage: homePage
}