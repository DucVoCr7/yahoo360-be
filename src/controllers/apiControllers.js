import pool from "../config/connectDatabase"; // Connect database

// Hàm truyền vào routes
// export const getAllUser = async (req, res)=> {
//     const [rows, fields] = await pool.execute('select * from users')
//     return res.status(200).json({
//         message: 'OK getAllUsers',
//         data: rows
//     })
// }
