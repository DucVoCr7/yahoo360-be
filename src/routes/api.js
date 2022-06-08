import express from "express";
import apiControllers from '../controllers/apiControllers'
const router = express.Router()

const initAPIRoutes = (app)=> {
    router.get('/', apiControllers.getHomePage)
    router.get('/posts/:id', apiControllers.getPost)
    return app.use ('/api', router)
}

export default initAPIRoutes;
