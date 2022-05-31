import express from "express";
import { getAllUsers } from "../controllers/webControllers";

const router = express.Router()

export const initWebRoutes = (app)=> {
    router.get('/', getAllUsers)
    return app.use ('/', router)
}
