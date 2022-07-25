import express from "express";
import apiFriendsControllers from '../controllers/apiFriendsControllers'
import verifyToken from "../middlewares/verifyToken";
const router = express.Router()

const initAPIFriendsRoutes = (app)=> {
    router.post('/sentRequest', apiFriendsControllers.sentRequest)
    router.delete('/removeRequest/:id', apiFriendsControllers.removeRequest)
    router.patch('/acceptRequest/:id', apiFriendsControllers.acceptRequest)
    router.delete('/refuseRequest/:id', apiFriendsControllers.refuseRequest)
    router.delete('/deleteFriend/:id', apiFriendsControllers.deleteFriend)
    return app.use ('/api/friends', verifyToken, router)
}

export default initAPIFriendsRoutes;
