import bcrypt from "bcryptjs"
import db from '../models/index'

const handleLogin = async (email, password) => {
    try {
        const dataUser = await db.users.findOne({
            where: {email: email},
            raw: true // = true để chỉ trả về dataValue thay vì những cái kèm theo
        })
        if(dataUser) {
            const checkPassword = bcrypt.compareSync(password, dataUser.password);
            if(checkPassword) {
                delete dataUser.password
                return {...dataUser}
            } else {
                return {mesErrPassword: 'Password incorrect!'}
            }
        } else {
            return {mesErrEmail: 'Email not exits!'}
        }
    } catch (error) {
        return(error)
    }
}
module.exports =  {
    handleLogin: handleLogin
}