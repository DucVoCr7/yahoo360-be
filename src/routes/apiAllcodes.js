import express from "express";
import apiAllcodesControllers from '../controllers/apiAllcodesControllers'

const router = express.Router()

const initAPIAllcodesRoutes = (app)=> {
    router.get('/', apiAllcodesControllers.getType)
    return app.use ('/api/allcodes', router)
}

export default initAPIAllcodesRoutes;