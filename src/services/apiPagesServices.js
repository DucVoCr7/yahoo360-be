import { decodeBase64 } from 'bcryptjs'
import db from '../models/index'

const getNewPosts = async () => {
    try {
        const newPosts = await db.posts.findAll({
            limit: 10,
            order: [
                ['id', 'DESC']
            ],
            include: [{ model: db.users, attributes: ['name'] }]
        })
        return newPosts
    } catch (error) { return (error) }
}

const getNewPostsCategory = async (category) => {
    try {
        const newPostsCategory = await db.posts.findAll({
            where: { category: category },
            limit: 5,
            order: [
                ['id', 'DESC']
            ],
            include: [{ model: db.users, attributes: ['name'] }]
        })
        return newPostsCategory
    } catch (error) { return (error) }
}
const getUserPage = async (id) => {
    try {
        const dataUser = await db.users.findOne({
            where: { id: id },
            attributes: {
                exclude: ['password'] //Khong tra ra password
            },
            include: [
                { model: db.posts },
                { model: db.photos },
                { model: db.musics },
                {
                    model: db.friends,
                    where: { status: true },
                    include: [
                        {
                            model: db.users,
                            as: 'dataFriend',
                            attributes: ['name', 'image']
                        }
                    ],
                    attributes: ['friendId', 'status'],
                },
            ],
            order: [
                [db.friends, 'id', 'DESC']
            ]
        })
        if (!dataUser) {
            return {
                errCode: 400,
                errors: {
                    message: 'User not found!'
                }
            }
        }
        return { dataUser }
    } catch (error) { return (error) }
}
const getPostsPage = async (category) => {
    try {
        const postsCategofy = await db.posts.findAll({
            where: { category: category },
            order: [
                ['id', 'DESC']
            ],
            include: [{ model: db.users, attributes: ['name'] }]
        })
        if (postsCategofy.length === 0) {
            return {
                errCode: 400,
                errors: {
                    message: 'Page not found!'
                }
            }
        }
        return postsCategofy
    } catch (error) { return (error) }
}
const getUserHomePage = async (id, userIdToken) => {
    try {
        if (id !== userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Token is not valid!'
                }
            }
        }
        const dataUser = await db.users.findOne({
            where: { id: id },
            attributes: {
                exclude: ['password'] //Khong tra ra password
            },
            include: [
                { model: db.posts },
                { model: db.photos },
                { model: db.musics },
                {
                    model: db.friends,
                    where: { status: true },
                    include: [
                        {
                            model: db.users,
                            as: 'dataFriend',
                            attributes: ['name', 'image']
                        }
                    ],
                    attributes: ['friendId', 'status'],
                },
            ],
            order: [

                [db.friends, 'id', 'DESC'],
            ]
        })
        if (!dataUser) {
            return {
                errCode: 400,
                errors: {
                    message: 'User not found!'
                }
            }
        }
        return { dataUser }
    } catch (error) { return (error) }
}
module.exports = {
    getNewPosts: getNewPosts,
    getNewPostsCategory: getNewPostsCategory,
    getUserPage: getUserPage,
    getPostsPage: getPostsPage,
    getUserHomePage: getUserHomePage
}