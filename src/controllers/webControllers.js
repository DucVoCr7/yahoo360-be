import pool from "../config/connectDatabase"; // Connect database
import db from '../models/index'
import { createUser } from "../services/CRUDServices";
// Hàm truyền vào routes
export const getCRUD = async (req, res) => {
    try {
        const data = await db.users.findAll();
        console.log(data)
        return res.render('web.ejs', {data: JSON.stringify(data)})
    } catch (error) {
        console.log(error)
    }
}

export const postCRUD = async (req, res)=> {
    try {
        await createUser(req.body)
        return res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}