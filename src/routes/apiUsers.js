import express from "express";
import apiUsersControllers from '../controllers/apiUsersControllers'
import uploadFile from "../middlewares/uploadFile";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router()

const initAPIUsersRoutes = (app)=> {
    router.get('/', apiUsersControllers.readAllUser)
    router.patch('/:id', uploadFile, apiUsersControllers.updateUser)
    router.delete('/:id', apiUsersControllers.deleteUser)
    return app.use ('/api/users', verifyToken, router)
}

export default initAPIUsersRoutes;
