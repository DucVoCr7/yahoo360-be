import apiServices from '../services/apiServices'
const getHomePage = async (req, res)=> {
    const newPosts = await apiServices.getNewPosts()
    const newPostsLife = await apiServices.getNewPostsCategory('Life')
    const newPostsSport = await apiServices.getNewPostsCategory('Sport')
    const newPostsStyle = await apiServices.getNewPostsCategory('Style')
    const newPostsTech = await apiServices.getNewPostsCategory('Tech')
    const newPostsMusic = await apiServices.getNewPostsCategory('Music')
    const newPostsCinema = await apiServices.getNewPostsCategory('Cinema')
    const newPostsTravel = await apiServices.getNewPostsCategory('Travel')
    const newPostsFood = await apiServices.getNewPostsCategory('Food')
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

const getPost = async (req, res)=> {
    const data = await apiServices.getPostById(req.params.id)
    res.status(200).json({
        ...data
    })
}

module.exports = {
    getHomePage: getHomePage,
    getPost: getPost
}