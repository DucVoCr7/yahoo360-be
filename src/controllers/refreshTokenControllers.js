import refreshTokenServices from '../services/refreshTokenServices'

const refreshToken = async (req, res)=> {
    if(!req.body.refreshToken) {
        return res.status(401).json({message: 'You are not 112authenticated!'})
    }
    const data = await refreshTokenServices.refreshToken(req.body.refreshToken)

    return res.status(200).json(data)
}
module.exports = {
    refreshToken: refreshToken
}