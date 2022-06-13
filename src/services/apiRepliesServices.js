import db from '../models/index'

const createReply = async (data, userIdToken) => {
    try {
        if (data.userId != userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        const newReply = await db.replies.create({
            ...data,
        })
        return {
            message: 'Reply success!',
            reply: newReply
        }
    } catch (error) { return (error) }
}
const updateReply = async (id, data, userIdToken) => {
    try {
        const reply = await db.replies.findOne({
            where: { id: id }
        })
        if (!reply) {
            return {
                errCode: 400,
                errors: {
                    message: 'Reply does not exist!'
                }
            }
        }
        if (reply.userId !== userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        const newReply = await reply.update({ ...data })
        return {
            message: 'Update Replys success!',
            reply: newReply
        }
    } catch (error) { return (error) }
}
const deleteReply = async (id, userIdToken) => {
    try {
        const reply = await db.replies.findOne({
            where: { id: id }
        })
        if (!reply) {
            return {
                errCode: 400,
                errors: {
                    message: 'Reply does not exist!'
                }
            }
        }
        if (reply.userId !== userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        await reply.destroy(); // Delete reply
        return {
            message: 'Delete reply success!'
        }
    } catch (error) { return (error) }
}

module.exports = {
    createReply: createReply,
    updateReply: updateReply, 
    deleteReply: deleteReply
}