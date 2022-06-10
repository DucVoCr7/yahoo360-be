import express from "express";
import apiPagesControllers from '../controllers/apiPagesControllers'
const router = express.Router()

const initAPIPagesRoutes = (app)=> {
    router.get('/homePage', apiPagesControllers.getHomePage)
    router.get('/homeUser/:id', apiPagesControllers.getUserPage)
    return app.use ('/api', router)
}

export default initAPIPagesRoutes;
