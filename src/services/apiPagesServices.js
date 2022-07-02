import db from '../models/index'

const getNewPostsCategory = async (category) => {
    try {
        const newPostsCategory = await db.posts.findAll({
            where: { category: category },
            limit: 6,
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
            include: [{ model: db.users, attributes: ['id', 'name', 'image'] }]
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
        const newPosts = []
        newPosts.push(
            newPostsC0.pop(),
            newPostsC1.pop(),
            newPostsC2.pop(),
            newPostsC3.pop(),
            newPostsC4.pop(),
            newPostsC5.pop(),
            newPostsC6.pop()
        )
        return {
            newPosts,
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
                    as: 'friend',
                    where: { status: true },
                    required: false,
                    include: [
                        {
                            model: db.users,
                            as: 'dataFriend',
                            attributes: ['id', 'name', 'image']
                        }
                    ],
                },
            ],
            order: [
                [db.posts, 'id', 'DESC'],
                [db.photos, 'id', 'DESC'],
                [db.musics, 'id', 'DESC'],
                [{model: db.friends, as: 'friend'}, 'id', 'DESC'],

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
                    as: 'friend',
                    where: { status: true },
                    required: false,
                    include: [
                        {
                            model: db.users,
                            as: 'dataFriend',
                            attributes: ['id', 'name', 'image']
                        }
                    ],
                }, 
                {
                    model: db.friends,
                    as: 'friendRequest',
                    where: { status: false },
                    required: false,
                    include: [
                        {
                            model: db.users,
                            as: 'dataFriendRequest',
                            attributes: ['id', 'name', 'image']
                        }
                    ],
                }
            ],
            order: [
                [db.posts, 'id', 'DESC'],
                [db.photos, 'id', 'DESC'],
                [db.musics, 'id', 'DESC'],
                [{model: db.friends, as: 'friend'}, 'id', 'DESC'],
                [{model: db.friends, as: 'friendRequest'}, 'id', 'DESC']
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