import db from '../models/index'

const readCommentsOfPost = async (postId) => {
    try {
        const post = await db.posts.findOne({
            where: {id: postId}
        })
        if(!post) {
            return {
                errCode: 400,
                errors: {
                    message: 'Post does not exist!'
                }
            }
        }
        const dataCommentsOfPost = await db.comments.findAll({
            where: {postId: postId},
            include: [
                {
                    model: db.users,
                    attributes: ['name', 'image']
                },
                {
                    model: db.replies,
                    include: [
                        {
                            model: db.users,
                            attributes: ['name', 'image']
                        }
                    ]
                }
            ],
            order: [
                [db.replies, 'id', 'DESC']
            ]
        })
        return {
            dataCommentsOfPost
        }
    } catch (error) { return (error) }
}
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
        const post = await db.posts.findOne({
            where: {id: data.postId}
        })
        await post.update({
            ...post,
            commentsNumber: post.commentsNumber + 1
        })
        return {
            message: 'Comment successfully!',
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
            message: 'Update comments successfully!',
            comment: newComment
        }
    } catch (error) { return (error) }
}
const deleteComment = async (id, userIdToken) => {
    try {
        const comment = await db.comments.findOne({
            where: { id: id },
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

        // Delete Replies
        const repliesNumber = await db.replies.destroy({where: {commentId: comment.id}})
        // Delete Comment
        await comment.destroy(); 
        const post = await db.posts.findOne({
            where: {id: comment.postId}
        })
        await post.update({
            ...post,
            commentsNumber: post.commentsNumber - 1 - repliesNumber
        })
        return {
            message: 'Delete comment successfully!'
        }
    } catch (error) { return (error) }
}

module.exports = {
    readCommentsOfPost: readCommentsOfPost,
    createComment: createComment,
    updateComment: updateComment,
    deleteComment: deleteComment
}