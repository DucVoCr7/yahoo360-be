import db from '../models/index'

const createMusic = async (data, userIdToken) => {
    try {
        if (data.userId != userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        const newMusic = await db.musics.create({
            ...data,
        })
        return {
            message: 'Add music success!',
            music: newMusic
        }
    } catch (error) { return (error) }
}

const deleteMusic = async (id, userIdToken) => {
    try {
        const music = await db.musics.findOne({
            where: { id: id },
        })
        if (!music) {
            return {
                errCode: 400,
                errors: {
                    message: 'Music does not exist!'
                }
            }
        }
        if (music.userId !== userIdToken) {
            return {
                errCode: 403,
                errors: {
                    message: 'Request not processed!'
                }
            }
        }
        await music.destroy();
        return {
            message: 'Delete music success!'
        }
    } catch (error) { return (error) }
}

module.exports = {
    createMusic: createMusic,
    deleteMusic: deleteMusic
}