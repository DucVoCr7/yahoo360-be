import express from "express";
import refreshTokenControllers from '../controllers/refreshTokenControllers'
import verifyToken from "../middlewares/verifyToken";

const router = express.Router()

const initRefreshTokenRoutes = (app)=> {
    router.post('/refreshToken', refreshTokenControllers.refreshToken)
    router.post('/deleteRefreshToken', verifyToken, refreshTokenControllers.deleteRefreshToken)
    return app.use ('/api', router)
}

export default initRefreshTokenRoutes;