import db from '../models/index'

const createComment = async (data, userIdToken) => {
    try {
        if (data.userId != userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        const newComment = await db.comments.create({
            ...data,
        })
        return {
            message: 'Comment success!',
            comment: newComment
        }
    } catch (error) { return (error) }
}
const updateComment = async (id, data, userIdToken) => {
    try {
        const comment = await db.comments.findOne({
            where: { id: id }
        })
        if (!comment) {
            return {
                errCode: 400,
                errors: {
                    message: 'Comment does not exist!'
                }
            }
        }
        if (comment.userId !== userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        const newComment = await comment.update({ ...data })
        return {
            message: 'Update comments success!',
            comment: newComment
        }
    } catch (error) { return (error) }
}
const deleteComment = async (id, userIdToken) => {
    try {
        const comment = await db.comments.findOne({
            where: { id: id }
        })
        if (!comment) {
            return {
                errCode: 400,
                errors: {
                    message: 'Comment does not exist!'
                }
            }
        }
        if (comment.userId !== userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        const commentHasDelete = await comment.destroy(); // Delete Comment
        await db.replies.destroy({where: {commentId: commentHasDelete.id}}) // Delete Replies
        return {
            message: 'Delete comment success!'
        }
    } catch (error) { return (error) }
}

module.exports = {
    createComment: createComment,
    updateComment: updateComment,
    deleteComment: deleteComment
}