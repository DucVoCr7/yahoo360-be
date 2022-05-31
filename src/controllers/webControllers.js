import pool from "../config/connectDatabase"; // Connect database
import db from '../models/index'
// Hàm truyền vào routes
export const getAllUsers = async (req, res) => {
    try {
        const data = await db.User.findAll();
        console.log(data)
        return res.render('web.ejs', {data: JSON.stringify(data)}) // Viết thay ở trên
    } catch (error){
        console.log(error)
    }
    // Render users from database Yahoo360
    // const [rows, fields] = await pool.execute('select * from users');
    // Note
    // Hàm res.render(tham số 1, tham số 2)
    // Tham số 1: file view muốn render
    // Tham số 2: là data muốn truyền sang view. Dạng object, key: value
    // key là tên của tham số muốn truy cập bên file view
    // value là dữ liệu truyền từ controller
    // return res.render('web.ejs', {users: rows}) // Từ controllers render ra file web.ejs của thư mục views
}