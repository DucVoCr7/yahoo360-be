import express from "express";
import { getCRUD, postCRUD } from "../controllers/webControllers";

const router = express.Router()

export const initWebRoutes = (app)=> {
    router.get('/', getCRUD)
    router.post('/postCRUD', postCRUD)
    return app.use ('/', router)
}
