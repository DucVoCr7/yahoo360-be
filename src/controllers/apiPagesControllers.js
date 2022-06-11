import apiPagesServices from '../services/apiPagesServices'

const getHomePage = async (req, res) => {
    const newPosts = await apiPagesServices.getNewPosts()
    const newPostsLife = await apiPagesServices.getNewPostsCategory('Life')
    const newPostsSport = await apiPagesServices.getNewPostsCategory('Sport')
    const newPostsStyle = await apiPagesServices.getNewPostsCategory('Style')
    const newPostsTech = await apiPagesServices.getNewPostsCategory('Tech')
    const newPostsMusic = await apiPagesServices.getNewPostsCategory('Music')
    const newPostsCinema = await apiPagesServices.getNewPostsCategory('Cinema')
    const newPostsTravel = await apiPagesServices.getNewPostsCategory('Travel')
    const newPostsFood = await apiPagesServices.getNewPostsCategory('Food')
    return res.status(200).json({
        newPosts,
        newPostsLife,
        newPostsSport,
        newPostsStyle,
        newPostsTech,
        newPostsMusic,
        newPostsCinema,
        newPostsTravel,
        newPostsFood
    })
}
const getUserPage = async (req, res) => {
    const data = await apiPagesServices.getUserPage(req.params.id)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}
const getPostsPage = async (req, res)=> {
    console.log('----------')
    console.log(req.query.category)
    const data = await apiPagesServices.getPostsPage(req.query.category)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}
module.exports = {
    getHomePage: getHomePage,
    getUserPage: getUserPage,
    getPostsPage: getPostsPage
}