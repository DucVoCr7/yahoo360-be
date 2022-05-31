import express from "express";

let router = express.Router()

export const initAPIRoutes = (app)=> {
    // router.get('/', Hàm từ controllers)
    return app.use ('/', router)
}
