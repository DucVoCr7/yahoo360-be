import db from '../models/index'

const createPost = async (data, userIdToken) => {
    try {
        if (data.userId != userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        const newPost = await db.posts.create({
            likesNumber: 0,
            ...data
        })
        return {
            message: 'Create post success!',
            post: newPost
        }
    } catch (error) { return (error) }
}
const readPost = async (id) => {
    try {
        const post = await db.posts.findOne({
            where: { id: id },
            include: [
                { model: db.users, attributes: ['name'] },
                {
                    model: db.comments,
                    attributes: { exclude: ['postsId'] },
                    include: [
                        {
                            model: db.users,
                            attributes: ['name', 'image']
                        },
                        {
                            model: db.replies,
                            attributes: { exclude: ['commentId'] },
                            include: [
                                {
                                    model: db.users, 
                                    attributes: ['name', 'image']
                                }
                            ]
                        }
                    ]
                }
            ],
            order: [
                [db.comments, db.replies , 'id', 'DESC']
            ]
        })
        if (!post) {
            return {
                errCode: 400,
                errors: {
                    message: 'Post does not exist!'
                }
            }
        }
        return {
            post
        }
    } catch (error) { return (error) }
}
const updatePost = async (id, data, userIdToken) => {
    try {
        const post = await db.posts.findOne({
            where: { id: id }
        })
        if (!post) {
            return {
                errCode: 400,
                errors: {
                    message: 'Post does not exist!'
                }
            }
        }
        if (post.userId !== userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        const newPost = await post.update({ ...data })
        return {
            message: 'Update post success!',
            post: newPost
        }
    } catch (error) { return (error) }
}

const deletePost = async (id, userIdToken) => {
    try {
        const post = await db.posts.findOne({
            where: { id: id },
            include: [{model: db.comments, attributes: ['id']}]
        })
        if (!post) {
            return {
                errCode: 400,
                errors: {
                    message: 'Post does not exist!'
                }
            }
        }
        if (post.userId !== userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        const postHasDelete = await post.destroy();
        // Delete Comments
        await db.comments.destroy({where:{postId: postHasDelete.id}})
        // Delete Replies Comments
        postHasDelete.comments.forEach(async (comment)=> 
            await db.replies.destroy({where: {commentId: comment.id}})
        )
        return {
            message: 'Delete post success!'
        }
    } catch (error) { return (error) }
}

module.exports = {
    createPost: createPost,
    readPost: readPost,
    updatePost: updatePost,
    deletePost: deletePost
}