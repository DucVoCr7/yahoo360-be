import db from '../models/index'

const requestFriend = async (data, userIdToken) => {
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
const acceptFriend = async (id, data, userIdToken) => {
    try {
        const requestFriend = await db.friends.findOne({
            where: { id: id }
        })
        if (!requestFriend) {
            return {
                errCode: 400,
                errors: {
                    message: 'Friend request does not exist!'
                }
            }
        }
        if (requestFriend.friendId !== userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        // Chấp nhận yêu cầu
        // Chuyển status
        const newFriend = await requestFriend.update({
            ...requestFriend,
            status: true
        })
        // Tạo ngược bạn
        await db.friends.create({
            userId: newFriend.friendId,
            friendId: newFriend.userId,
            status: true
        })
        return {
            message: 'Add friend success!',
            newFriend: newFriend
        }
    } catch (error) { return (error) }
}
const refuseFriend = async (id, userIdToken) => {
    try {
        const dataRequestFriend = await db.friends.findOne({
            where: { id: id },
        })
        if (!dataRequestFriend) {
            return {
                errCode: 400,
                errors: {
                    message: 'Friend does not exist!'
                }
            }
        }
        if (dataRequestFriend.friendId !== userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        await dataRequestFriend.destroy();
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
        const friendHasDelete = await dataFriend.destroy();
        console.log(friendHasDelete)
        // Xóa dữ liệu ở người bạn
        await db.friends.destroy({
            where: {
                userId: friendHasDelete.friendId,
                friendId: friendHasDelete.userId
            }
        })
        return {
            message: 'Remove friend success!'
        }
    } catch (error) { return (error) }
}
module.exports = {
    requestFriend: requestFriend,
    acceptFriend: acceptFriend,
    refuseFriend: refuseFriend,
    deleteFriend: deleteFriend
}