import db from '../models/index'

const getType = async () => {
    try {
        const data = await db.allcodes.findAll({
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