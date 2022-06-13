import db from '../models/index'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const createAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_TIME_EXPIRE })
}

const createRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET)
}

const saveRefreshToken = async (userId, refreshToken) => {
    try {
        await db.refreshTokens.create({
            userId,
            refreshToken
        })
    } catch (error) { return (error) }
}

const refreshToken = async (refreshToken) => {
    try {
        const data = await db.refreshTokens.findOne({
            where: { refreshToken: refreshToken },
        })
        if (!data) {
            return {
                errCode: 403,
                errors: {
                    message: 'Refresh token is not valid!'
                }
            }
        }
        const newToken = jwt.verify(data.refreshToken, process.env.JWT_REFRESH_SECRET, async (error, dataToken) => {
            if (error) {
                return { message: 'Refresh token is not valid!' }
            }
            await data.destroy();
            const newAccessToken = createAccessToken(dataToken.userId)
            const newRefreshToken = createRefreshToken(dataToken.userId)
            await saveRefreshToken(data.userId, newRefreshToken)
            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            }
        })
        return newToken
    } catch (error) { return (error) }
}
const deleteRefreshToken = async (refreshToken)=> {
    try {
        const data = await db.refreshTokens.findOne({
            where: { refreshToken: refreshToken },
        })
        if (!data) {
            return {
                errCode: 403,
                errors: {
                    message: 'Refresh token is not valid!'
                }
            }
        }
        const message = jwt.verify(data.refreshToken, process.env.JWT_REFRESH_SECRET, async (error, dataToken) => {
            if (error) {
                return { message: 'Refresh token is not valid!' }
            }
            await db.refreshTokens.destroy({where: {userId: dataToken.userId}});
            return {
                message: 'You logged out successfully!'
            }
        })
        return message
    } catch (error) { return (error) }
}
module.exports = {
    refreshToken: refreshToken,
    deleteRefreshToken: deleteRefreshToken
}