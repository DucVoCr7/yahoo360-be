import express from "express";
import apiControllers from '../controllers/apiControllers'
let router = express.Router()

export const initAPIRoutes = (app)=> {
    // router.get('/', Hàm từ controllers)
    router.post('/api/login', apiControllers.login)
    return app.use ('/', router)
}
