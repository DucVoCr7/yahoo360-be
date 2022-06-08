import bcrypt from "bcryptjs"
import db from '../models/index'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const handleDataReqErr = (actionReq, dataReq)=> {

    const errors = {}
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if (actionReq === 'register') {
        if(!dataReq.name?.trim()) {
            errors.name = 'Enter your name!'
        }
    }

    if(!dataReq.email?.trim()) {
        errors.email = 'Enter your email!'
    } else if(!regex.test(dataReq.email)) {
        errors.email = 'Enter a valid email!'
    }

    if(!dataReq.password?.trim()) {
        errors.password = 'Enter your password!'
    } else if(dataReq.password.length < 6) {
        errors.password = 'Enter at least 6 characters!'
    }

    return errors
}

const hashPassword = async (password)=> {
    try {
        const hashPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        return hashPassword
    } catch (error) {return error}
}

const createAccessToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_ACCESS_SECRET, {expiresIn: '1m'})
}

const createRefreshToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_REFRESH_SECRET)
}

const handleLogin = async (email, password) => {
    try {
        const user = await db.users.findOne({
            where: {email: email},
            raw: true // Để chỉ nhận value, không nhận mấy cái linh tinh vào biến user
        })
        if(user) {
            const checkPassword = bcrypt.compareSync(password, user.password);
            if(checkPassword) {
                delete user.password
                const accessToken = createAccessToken(user.id)
                const refreshToken = createRefreshToken(user.id)
                return {user, accessToken, refreshToken}
            } else {
                return {password: 'Password incorrect!'}
            }
        } else {
            return {email: 'Email not exits!'}
        }
    } catch (error) {return(error)}
}

const handleRegister = async (name, email, password) => {
    try {
        const checkEmail = await db.users.findOne({
            where: {email: email}
        })
        if(checkEmail) {
            return {email: 'Email is exits!'}
        }
        else {
            const passwordHasHash = await hashPassword(password)
            await db.users.create({
                name: name,
                email: email,
                password: passwordHasHash
            })
            return {email: 'ok'}
        }
    } catch (error) {return (error)}
}

module.exports =  {
    handleDataReqErr: handleDataReqErr,
    handleLogin: handleLogin,
    handleRegister: handleRegister
}