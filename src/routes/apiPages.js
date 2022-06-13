import express from "express";
import apiPagesControllers from '../controllers/apiPagesControllers'
import verifyToken from "../middlewares/verifyToken";
const router = express.Router()

const initAPIPagesRoutes = (app)=> {
    router.get('/homePage', apiPagesControllers.getHomePage)
    router.get('/userPage/:id', apiPagesControllers.getUserPage)
    router.get('/postsPage', apiPagesControllers.getPostsPage)
    router.get('/userHomePage', verifyToken, apiPagesControllers.getUserHomePage)
    router.get('/')
    return app.use ('/api', router)
}

export default initAPIPagesRoutes;
