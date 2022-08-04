import express from "express";
import apiAdminControllers from '../controllers/apiAdminControllers'
import verifyToken from "../middlewares/verifyToken";

const router = express.Router()

const initAPIAdminRoutes = (app)=> {
    router.get('/', apiAdminControllers.readAllUser)
    router.post('/:id', apiAdminControllers.logoutUser)
    router.delete('/:id', apiAdminControllers.deleteUser)
    return app.use ('/api/admin', verifyToken, router)
}

export default initAPIAdminRoutes;
