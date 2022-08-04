import db from '../models/index'
const cloudinary = require('../utils/cloudinary')

const readAllUser = async (userIdToken) => {
    try {
        const admin = await db.users.findOne({
            where: {id: userIdToken},
            order: [
                ['id', 'DESC']
            ],
        })
        if (!admin || admin.role !== 'R0') {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        const data = await db.users.findAll({
            attributes: {
                exclude: ['password'] //Khong tra ra password
            }
        });
        return {
            data
        }
    } catch (error) { return (error) }
}
const logoutUser = async (id, userIdToken)=> {
    try {
        const admin = await db.users.findOne({
            where: {id: userIdToken}
        })
        if (!admin || admin.role !== 'R0') {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        const data = await db.refreshTokens.findAll({
            where: { userId: id },
        })
        if (data.length === 0) {
            return {
                message: 'User is not logged in!'
            }
        }
        await db.refreshTokens.destroy({where: {userId: id}});
        return {
            message: 'Logout user successfully!'
        }
    } catch (error) { return (error) }
}
const deleteUser = async (id, userIdToken) => {
    try {
        const user = await db.users.findOne({
            where: { id: id },
        })
        if (!user) {
            return {
                errCode: 400,
                errors: {
                    message: 'User does not exist!'
                }
            }
        }
        const admin = await db.users.findOne({
            where: {id: userIdToken}
        })
        if (!admin || admin.role !== 'R0') {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }

        // Chỗ này từ từ viết thêm
        // Delete refreshToken
        await db.refreshTokens.destroy({where:{userId: user.id}})
        // Delete likes
        await db.likes.destroy({where:{userId: user.id}})
        // Delete musics
        await db.musics.destroy({where:{userId: user.id}})
        // Delete comments
        await db.comments.destroy({where:{userId: user.id}})
        // Delete replies
        await db.replies.destroy({where:{userId: user.id}})
        // Delete photos
        await db.photos.destroy({where:{userId: user.id}})
        // Delete posts
        await db.posts.destroy({where: {userId: user.id}})
        // Delete image on cloudiany
        if (user.cloudinary_id) {
            await cloudinary.uploader.destroy(user.cloudinary_id)
        }
        // Delete user
        await user.destroy();

        return {
            message: 'Delete user successfully!',
        }
    } catch (error) { return (error) }
}

module.exports = {
    readAllUser: readAllUser,
    logoutUser: logoutUser,
    deleteUser: deleteUser
}