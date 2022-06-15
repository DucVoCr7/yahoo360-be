import db from '../models/index'
const cloudinary = require('../utils/cloudinary')

const createPost = async (data, userIdToken, path) => {
    try {
        if (data.userId != userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        const resultImage = await cloudinary.uploader.upload(path);
        const newPost = await db.posts.create({
            ...data,
            likesNumber: 0,
            image: resultImage.secure_url,
            cloudinary_id: resultImage.public_id
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
const updatePost = async (id, data, userIdToken, path) => {
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
        // Co path thi xoa image cu. Gan image new vao
        console.log(path)
        if (path) {
            await cloudinary.uploader.destroy(post.cloudinary_id)
            const resultImage = await cloudinary.uploader.upload(path);
            data.image = resultImage.secure_url
            data.cloudinary_id = resultImage.public_id
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
        // Delete image on cloudiany
        await cloudinary.uploader.destroy(postHasDelete.cloudinary_id)
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