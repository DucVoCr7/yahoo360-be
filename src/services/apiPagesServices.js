import db from '../models/index'

const getNewPostsCategory = async (category) => {
    try {
        const newPostsCategory = await db.posts.findAll({
            where: { category: category },
            limit: 5,
            order: [
                ['id', 'DESC']
            ],
        })
        return newPostsCategory
    } catch (error) { return (error) }
}
const postsPage = async (category)=> {
    try {
        const dataPosts = await db.posts.findAll({
            where: {category: category},
            order: [
                ['id', 'DESC']
            ],
            include: [{ model: db.users, attributes: ['name', 'image'] }]
        })
        if (dataPosts.length === 0) {
            return {
                errCode: 400,
                errors: {
                    message: 'Page not found!'
                }
            }
        }
        return {
            dataPosts
        }
    } catch (error) { return (error) }
}
const communityPage = async () => {
    try {
        const newPostsC0 = await getNewPostsCategory('C0')
        const newPostsC1 = await getNewPostsCategory('C1')
        const newPostsC2 = await getNewPostsCategory('C2')
        const newPostsC3 = await getNewPostsCategory('C3')
        const newPostsC4 = await getNewPostsCategory('C4')
        const newPostsC5 = await getNewPostsCategory('C5')
        const newPostsC6 = await getNewPostsCategory('C6')
        return {
            newPostsC0,
            newPostsC1,
            newPostsC2,
            newPostsC3,
            newPostsC4,
            newPostsC5,
            newPostsC6,
        }
    } catch (error) { return (error) }
}
const userPage = async (id) => {
    try {
        const dataUser = await db.users.findOne({
            where: { id: id },
            attributes: {
                exclude: ['password'] //Khong tra ra password
            },
            include: [
                {
                    model: db.posts
                },
                {
                    model: db.photos
                },
                {
                    model: db.musics
                },
                {
                    model: db.friends,
                    as: 'friends',
                    where: { status: true },
                    required: false,
                    include: [
                        {
                            model: db.users,
                            as: 'dataFriend',
                            attributes: ['name', 'image']
                        }
                    ],
                }
            ],
            order: [
                [db.posts, 'id', 'DESC'],
                [db.photos, 'id', 'DESC'],
                [db.musics, 'id', 'DESC'],
                [{model: db.friends, as: 'friends'}, 'id', 'DESC']
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
const homePage = async (id, userIdToken) => {
    try {
        if (id != userIdToken) {
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
                {
                    model: db.posts
                },
                {
                    model: db.photos
                },
                {
                    model: db.musics
                },
                {
                    model: db.friends,
                    as: 'friends',
                    where: { status: true },
                    required: false, // Để có thể trả về mảng rỗng
                    include: [
                        {
                            model: db.users,
                            as: 'dataFriend',
                            attributes: ['name', 'image']
                        }
                    ],
                },
                {
                    model: db.friends,
                    as: 'friendRequestSents',
                    where: { status: false },
                    required: false, // Để có thể trả về mảng rỗng
                    include: [
                        {
                            model: db.users,
                            as: 'dataFriendRequestSent',
                            attributes: ['name', 'image']
                        }
                    ],
                }, 
                {
                    model: db.friends,
                    as: 'friendRequestReceiveds',
                    where: { status: false },
                    required: false, // Để có thể trả về mảng rỗng
                    include: [
                        {
                            model: db.users,
                            as: 'dataFriendRequestReceived',
                            attributes: ['name', 'image']
                        }
                    ],
                }
            ],
            order: [
                [db.posts, 'id', 'DESC'],
                [db.photos, 'id', 'DESC'],
                [db.musics, 'id', 'DESC'],
                [{model: db.friends, as: 'friends'}, 'id', 'DESC'],
                [{model: db.friends, as: 'friendRequestReceiveds'}, 'id', 'DESC'],
                [{model: db.friends, as: 'friendRequestSents'}, 'id', 'DESC']
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
    postsPage: postsPage,
    communityPage: communityPage,
    userPage: userPage,
    homePage: homePage
}