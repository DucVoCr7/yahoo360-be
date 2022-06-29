import express from "express";
import apiPagesControllers from '../controllers/apiPagesControllers'
import verifyToken from "../middlewares/verifyToken";
const router = express.Router()

const initAPIPagesRoutes = (app)=> {
    router.get('/postsPage', apiPagesControllers.postsPage)
    router.get('/communityPage', apiPagesControllers.communityPage)
    router.get('/userPage/:id', apiPagesControllers.userPage)
    router.get('/homePage/:id', verifyToken, apiPagesControllers.homePage)
    return app.use ('/api', router)
}

export default initAPIPagesRoutes;
