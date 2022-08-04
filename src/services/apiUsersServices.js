import db from '../models/index'
const cloudinary = require('../utils/cloudinary')

const updateUser = async (id, data, userIdToken, path) => {
    try {
        const user = await db.users.findOne({
            where: { id: id }
        })
        if (!user) {
            return {
                errCode: 400,
                errors: {
                    message: 'User does not exist!'
                }
            }
        }
        if (user.id !== userIdToken || data.role) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        // Co path thi xoa image cu. Gan image new vao
        if (path) {
            user.cloudinary_id && await cloudinary.uploader.destroy(user.cloudinary_id)
            const resultImage = await cloudinary.uploader.upload(path);
            data.image = resultImage.secure_url
            data.cloudinary_id = resultImage.public_id
        }
        const newUser = await user.update({ ...data })
        return {
            message: 'Update user successfully!',
            user: newUser
        }
    } catch (error) { return (error) }
}


module.exports = {
    updateUser: updateUser
}