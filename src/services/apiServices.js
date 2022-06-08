import db from '../models/index'

const getNewPosts = async ()=> {
    try {
        const newPosts = await db.posts.findAll({
            limit: 10,
            order: [
                ['id', 'DESC']
            ],
            include: [{model: db.users, attributes: ['name']}]
        })
        return newPosts
    } catch (error) {return(error)}
}

const getNewPostsCategory = async (category)=> {
    try {
        const newPostsCategory = await db.posts.findAll({
            where: {category: category},
            limit: 5,
            order: [
                ['id', 'DESC']
            ],
            include: [{model: db.users, attributes: ['name']}]
        })
        return newPostsCategory
    } catch (error) {return(error)}
}

const getPostById = async (id)=> {
    try {
        const post = await db.posts.findOne({
            where: {id: id},
            include: [{model: db.users, attributes: ['name']}]
        })
        console.log(post)
        if(post) {
            return {post}
        } else {
            return {message: 'Post no exist!'}
        }
    } catch (error) {return(error)}
}
module.exports = {
    getNewPosts: getNewPosts,
    getNewPostsCategory: getNewPostsCategory,
    getPostById: getPostById
}