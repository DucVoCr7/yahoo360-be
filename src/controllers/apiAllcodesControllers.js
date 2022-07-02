import apiAllcodesServices from '../services/apiAllcodesServices'

const getType = async (req, res) => {
    const data = await apiAllcodesServices.getType(req.query.type)
    if (data.errcodes) {
        return res.status(data.errcodes).json(data.errors)
    }
    return res.status(200).json(data)
}

module.exports = {
    getType: getType,
}