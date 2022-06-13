import express from "express";
import apiPhotosControllers from '../controllers/apiPhotosControllers'
import verifyToken from "../middlewares/verifyToken";
const router = express.Router()

const initAPIPhotosRoutes = (app)=> {
    router.post('/', verifyToken, apiPhotosControllers.createPhoto)
    router.delete('/:id', verifyToken, apiPhotosControllers.deletePhoto)
    return app.use ('/api/photos', router)
}

export default initAPIPhotosRoutes;
