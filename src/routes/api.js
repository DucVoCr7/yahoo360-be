import express from "express";
import apiControllers from '../controllers/apiControllers'
const router = express.Router()

const initAPIRoutes = (app)=> {
    // router.get('/', Hàm từ controllers)
    return app.use ('/', router)
}

export default initAPIRoutes;
