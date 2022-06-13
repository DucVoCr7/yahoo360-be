import apiMusicsServices from '../services/apiMusicsServices'

const createMusic = async (req, res) => {
    const data = await apiMusicsServices.createMusic(req.body, req.userIdToken)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}
const deleteMusic = async (req, res) => {
    const data = await apiMusicsServices.deleteMusic(req.params.id, req.userIdToken)
    if (data.errCode) {
        return res.status(data.errCode).json(data.errors)
    }
    return res.status(200).json(data)
}
module.exports = {
    createMusic: createMusic,
    deleteMusic: deleteMusic
}