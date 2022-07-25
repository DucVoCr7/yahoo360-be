import db from '../models/index'
const sentRequest = async (data, userIdToken) => {
    try {
        if (data.userId != userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        await db.friends.create({
            ...data,
            status: false
        })
        return {
            message: 'Friend request sent successfully!'
        }
    } catch (error) { return (error) }
}
const removeRequest = async (id, userIdToken) => {
    try {
        const request = await db.friends.findOne({
            where: { id: id }
        })
        if (!request) {
            return {
                errCode: 400,
                errors: {
                    message: 'Friend request does not exist!'
                }
            }
        }
        if (request.userId !== userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        // Chấp nhận yêu cầu
        // Chuyển status
        await request.destroy()
        return {
            message: 'Remove request successfully!',
        }
    } catch (error) { return (error) }
}
const acceptRequest = async (id, userIdToken) => {
    try {
        const request = await db.friends.findOne({
            where: { id: id }
        })
        if (!request) {
            return {
                errCode: 400,
                errors: {
                    message: 'Friend request does not exist!'
                }
            }
        }
        if (request.friendId !== userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        // Chấp nhận yêu cầu
        // Chuyển status
        await request.update({
            ...request,
            status: true
        })
        // Tạo ngược bạn
        await db.friends.create({
            userId: request.friendId,
            friendId: request.userId,
            status: true
        })
        return {
            message: 'Add friend successfully!',
        }
    } catch (error) { return (error) }
}
const refuseRequest = async (id, userIdToken) => {
    try {
        const request = await db.friends.findOne({
            where: { id: id },
        })
        if (!request) {
            return {
                errCode: 400,
                errors: {
                    message: 'Friend does not exist!'
                }
            }
        }
        if (request.friendId !== userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        await request.destroy();
            return {
                message: 'You declined the friend request!'
            }
    } catch (error) { return (error) }
}

const deleteFriend = async (id, userIdToken) => {
    try {
        const dataFriend = await db.friends.findOne({
            where: { id: id },
        })
        if (!dataFriend) {
            return {
                errCode: 400,
                errors: {
                    message: 'Friend does not exist!'
                }
            }
        }
        if (dataFriend.userId !== userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }

        // Xóa dữ liệu ở người bạn
        await db.friends.destroy({
            where: {
                userId: dataFriend.friendId,
                friendId: dataFriend.userId
            }
        })
        // Xóa dữ liệu ở chính mình
        await dataFriend.destroy();

        return {
            message: 'Remove friend successfully!'
        }
    } catch (error) { return (error) }
}
module.exports = {
    removeRequest: removeRequest,
    sentRequest: sentRequest,
    acceptRequest: acceptRequest,
    refuseRequest: refuseRequest,
    deleteFriend: deleteFriend
}