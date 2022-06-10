import db from '../models/index'

const createPost = async (data, userId)=> {
    try {
        const newPost = await db.posts.create({
            likesNumber: 0,
            userId: userId,
            ...data
        })
        return newPost
    } catch (error) {return(error)}
}
const readPost = async (id)=> {
    try {
        const post = await db.posts.findOne({
            where: {id: id},
            include: [{model: db.users, attributes: ['name']}]
        })
        if(post) {
            return {post}
        } else {
            return {message: 'Post does not exist!'}
        }
    } catch (error) {return(error)}
}
const updatePost = async (id, data, userId)=> {
    try {
        const post = await db.posts.findOne({
            where: {id: id}
        })
        if(post) {
            if(post.userId === userId) {
                const newPost = await post.update({...data})
                return newPost
            } else {
                return {message: 'You cannot update this post!'}
            }
        } else {
            return {message: 'Post does not exist!'}
        }
    } catch (error) {return(error)}
}

const deletePost = async (id, userId)=> {
    try {
        const post = await db.posts.findOne({
            where: {id: id},
        })
        if(post) {
            if(post.userId === userId) {
                await post.destroy();
                return {message: 'Delete post success!'}
            } else {
                return {message: 'You cannot delete this post!'}
            }
        } else {
            return {message: 'Post does not exist!'}
        }
    } catch (error) {return(error)}
}

module.exports = {
    createPost: createPost,
    readPost: readPost,
    updatePost: updatePost,
    deletePost: deletePost
}