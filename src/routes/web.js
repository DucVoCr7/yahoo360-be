import express from "express";
import webControllers from '../controllers/webControllers'
const router = express.Router()

const initWebRoutes = (app)=> {
    router.get('/', webControllers.helloServer)
    return app.use ('/', router)
}

export default initWebRoutes;
