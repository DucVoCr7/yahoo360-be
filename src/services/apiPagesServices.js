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
const getUserPage = async (id)=> {
    try {
        const dataUser = await db.users.findOne({
            where: {id: id},
            attributes: {
                exclude: ['password'] //Khong tra ra password
            },
            include: [
                {model: db.posts}, 
                {model: db.photos}, 
                {model: db.musics}, 
                {model: db.friends, attributes: ['friendId', 'status']} // Báo lỗi không include được
            ]
        })
        if(dataUser) {
            return {dataUser}
        } else {
            return {message: 'User not found!'}
        }
    } catch (error) {return(error)}
}
module.exports = {
    getNewPosts: getNewPosts,
    getNewPostsCategory: getNewPostsCategory,
    getUserPage: getUserPage
}