import apiPostsServices from '../services/apiPostsServices'

const createPost = async (req, res)=> {
    const data = await apiPostsServices.createPost(req.body, req.dataToken)
    return res.status(200).json(data)
}
const readPost = async (req, res)=> {
    if (!req.params.id) {
        return res.status(401).json({message: 'Request not processed!'})
    }
    const data = await apiPostsServices.readPost(req.params.id)
    return res.status(200).json(data)
}
const updatePost = async (req, res)=> {
    if (!req.params.id) {
        return res.status(401).json({message: 'Request not processed!'})
    }
    const data = await apiPostsServices.updatePost(req.params.id, req.body, req.dataToken)
    return res.status(200).json(data)
}
const deletePost = async (req, res)=> {
    if (!req.params.id) {
        return res.status(401).json({message: 'Request not processed!'})
    }
    const data = await apiPostsServices.deletePost(req.params.id, req.dataToken)
    return res.status(200).json(data)
}
module.exports = {
    createPost: createPost,
    readPost: readPost,
    updatePost: updatePost,
    deletePost: deletePost
}