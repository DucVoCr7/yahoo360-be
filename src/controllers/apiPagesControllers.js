import apiPagesServices from '../services/apiPagesServices'

const getHomePage = async (req, res)=> {
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
const getUserPage = async (req, res)=> {
    if (!req.params.id) {
        return res.status(401).json({message: 'Request not processed!'})
    }
    const dataUser = await apiPagesServices.getUserPage(req.params.id)
    return res.status(200).json(dataUser)
}
module.exports = {
    getHomePage: getHomePage,
    getUserPage: getUserPage
}