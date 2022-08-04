import db from '../models/index'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { createAccessToken, createRefreshToken, saveRefreshToken } from '../utils/JWTAction'

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

module.exports = {
    refreshToken: refreshToken,
}