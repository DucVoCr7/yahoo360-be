import db from '../models/index'

const readRepliesOfComment = async (commentId) => {
    try {
        const comment = await db.comments.findOne({
            where: {id: commentId}
        })
        if(!comment) {
            return {
                errCode: 400,
                errors: {
                    message: 'Comment does not exist!'
                }
            }
        }
        const dataRepliesOfComment = await db.replies.findAll({
            where: {commentId: commentId},
            include: [
                {
                    model: db.users,
                    attributes: ['name', 'image']
                },
            ],
            order: [
                ['id', 'DESC']
            ]
        })
        return {
            dataRepliesOfComment
        }
    } catch (error) { return (error) }
}
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

        const reply = await db.replies.findOne({
            where: {id : newReply.id},
            include: [
                { model: db.users, attributes: ['name', 'image'] }
            ]
        })

        const post = await db.posts.findOne({
            where: {id: data.postId}
        })
        await post.update({
            ...post,
            commentsNumber: post.commentsNumber + 1
        })

        return {
            message: 'Reply success!',
            reply: reply
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

        const comment = await db.comments.findOne({
            where: {id: reply.commentId}, //////
            include: [
                {
                    model: db.posts,
                    attributes: ['id']
                },
            ],
        })
        const post = await db.posts.findOne({
            where: {id: comment.post.id}
        })
        await post.update({
            ...post,
            commentsNumber: post.commentsNumber - 1
        })

        return {
            message: 'Delete reply success!'
        }
    } catch (error) { return (error) }
}

module.exports = {
    readRepliesOfComment: readRepliesOfComment,
    createReply: createReply,
    updateReply: updateReply, 
    deleteReply: deleteReply
}