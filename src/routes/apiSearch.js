import express from "express";
import apiSearchControllers from '../controllers/apiSearchControllers'

const router = express.Router()

const initAPISearchRoutes = (app)=> {
    router.get('/searchPosts', apiSearchControllers.searchPostTitle)
    router.get('/searchUsers', apiSearchControllers.searchUserEmail)
    return app.use ('/api', router)
}

export default initAPISearchRoutes;