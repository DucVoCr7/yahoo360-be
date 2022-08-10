import express from "express";
import authenticationControllers from '../controllers/authenticationControllers'
const router = express.Router()

const initAuthenticationRoutes = (app)=> {
    router.post('/login', authenticationControllers.login)
    router.post('/register', authenticationControllers.register)
    router.post('/logout', authenticationControllers.logout)
    return app.use ('/api', router)
}

export default initAuthenticationRoutes;
