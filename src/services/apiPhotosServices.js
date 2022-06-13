import db from '../models/index'

const createPhoto = async (data, userIdToken) => {
    try {
        if (data.userId != userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        const newPhoto = await db.photos.create({
            ...data,
        })
        return {
            message: 'Add photo success!',
            photo: newPhoto
        }
    } catch (error) { return (error) }
}

const deletePhoto = async (id, userIdToken) => {
    try {
        const photo = await db.photos.findOne({
            where: { id: id },
        })
        if (!photo) {
            return {
                errCode: 400,
                errors: {
                    message: 'Photo does not exist!'
                }
            }
        }
        if (photo.userId !== userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        await photo.destroy();
        return {
            message: 'Delete photo success!'
        }
    } catch (error) { return (error) }
}

module.exports = {
    createPhoto: createPhoto,
    deletePhoto: deletePhoto
}