import express from "express";
import apiUsersControllers from '../controllers/apiUsersControllers'
import uploadFile from "../middlewares/uploadFile";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router()

const initAPIUsersRoutes = (app)=> {
    router.patch('/:id', uploadFile, apiUsersControllers.updateUser)
    return app.use ('/api/users', verifyToken, router)
}

export default initAPIUsersRoutes;
