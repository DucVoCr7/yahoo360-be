import db from '../models/index'

const getType = async (type) => {
    try {
        const data = await db.allcodes.findAll({
            where: {type: type}
        })
        if(!data) {
            return {
                errCode: 400,
                errors: {
                    message: 'Type does not exist!'
                }
            }
        }
        return {
            data
        }
    } catch (error) { return (error) }
}

module.exports = {
    getType: getType
}