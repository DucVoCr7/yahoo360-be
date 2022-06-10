import bcrypt from "bcryptjs"
import db from '../models/index'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const createAccessToken = (userId)=> {
    return jwt.sign({userId}, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.JWT_TIME_EXPIRE})
}

const createRefreshToken = (userId)=> {
    return jwt.sign({userId}, process.env.JWT_REFRESH_SECRET)
}

const saveRefreshToken = async (userId, refreshToken)=> {
    try {
        await db.refreshTokens.create({
            userId,
            refreshToken
        })
    } catch (error) {return(error)}
}

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

const hashPassword = (password)=> {
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    return hashPassword
}

const handleLogin = async (email, password) => {
    try {
        const user = await db.users.findOne({
            where: {email},
            raw: true // Để chỉ nhận value, không nhận mấy cái linh tinh vào biến user
        })
        if(user) {
            const checkPassword = bcrypt.compareSync(password, user.password);
            if(checkPassword) {
                delete user.password
                const accessToken = createAccessToken(user.id)
                const refreshToken = createRefreshToken(user.id)
                await saveRefreshToken(user.id, refreshToken)
                return {user, accessToken, refreshToken}
            }
            return {password: 'Password incorrect!'}
        }
        return {email: 'Email is not registered!'}
    } catch (error) {return(error)}
}

const handleRegister = async (name, email, password) => {
    try {
        const checkEmail = await db.users.findOne({
            where: {email}
        })
        if(checkEmail) {
            return {email: 'Email already exists!'}
        }
        const user = (await db.users.create({
            name: name,
            email: email,
            password: hashPassword(password)
        })).get({plain:true}) // Tương tự set raw: true để delete password
        delete user.password
        const accessToken = createAccessToken(user.id)
        const refreshToken = createRefreshToken(user.id)
        await saveRefreshToken(user.id, refreshToken)
        return {user, accessToken, refreshToken}
    } catch (error) {return (error)}
}

module.exports =  {
    handleDataReqErr: handleDataReqErr,
    handleLogin: handleLogin,
    handleRegister: handleRegister
}