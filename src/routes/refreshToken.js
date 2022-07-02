import express from "express";
import refreshTokenControllers from '../controllers/refreshTokenControllers'

const router = express.Router()

const initRefreshTokenRoutes = (app)=> {
    router.post('/refreshToken', refreshTokenControllers.refreshToken)
    router.post('/deleteRefreshToken', refreshTokenControllers.deleteRefreshToken)
    return app.use ('/api', router)
}

export default initRefreshTokenRoutes;