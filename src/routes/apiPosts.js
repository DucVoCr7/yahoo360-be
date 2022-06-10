import express from "express";
import apiPostsControllers from '../controllers/apiPostsControllers'
import verifyToken from "../middlewares/verifyToken";
const router = express.Router()

const initAPIPostsRoutes = (app)=> {
    router.post('/', verifyToken, apiPostsControllers.createPost)
    router.get('/:id', apiPostsControllers.readPost)
    router.patch('/:id', verifyToken, apiPostsControllers.updatePost)
    router.delete('/:id', verifyToken, apiPostsControllers.deletePost)
    return app.use ('/api/posts', router)
}

export default initAPIPostsRoutes;
