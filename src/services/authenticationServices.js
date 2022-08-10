import bcrypt from "bcryptjs"
import db from '../models/index'
import { createAccessToken, createRefreshToken, saveRefreshToken } from '../utils/JWTAction'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const handleDataInput = (actionReq, dataReq) => {

    const errors = {}
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if (actionReq === 'register') {
        if (!dataReq.name?.trim()) {
            errors.name = 'Enter your name!'
        }
    }

    if (!dataReq.email?.trim()) {
        errors.email = 'Enter your email!'
    } else if (!regex.test(dataReq.email)) {
        errors.email = 'Enter a valid email!'
    }

    if (!dataReq.password?.trim()) {
        errors.password = 'Enter your password!'
    } else if (dataReq.password.length < 6) {
        errors.password = 'At least 6 characters!'
    }

    return errors
}

const hashPassword = (password) => {
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    return hashPassword
}

const login = async (data) => {
    try {
        // Xử lí dữ liệu Input
        const errors = handleDataInput('login', data)
        if (Object.keys(errors).length !== 0) {
            return {
                errCode: 400,
                errors
            }
        }
        // Xử lí dữ liệu khi đầy đủ input
        const user = await db.users.findOne({
            where: { email: data.email },
            raw: true // Để chỉ nhận value, không nhận mấy cái linh tinh vào biến user
        })
        if (!user) {
            return {
                errCode: 401,
                errors: {
                    email: `Email isn't registered!`
                }
            }
        }
        // Check password
        const checkPassword = bcrypt.compareSync(data.password, user.password);
        if (!checkPassword) {
            return {
                errCode: 401,
                errors: {
                    password: 'Password incorrect!'
                }
            }
        }
        delete user.password
        const accessToken = createAccessToken(user.id)
        const refreshToken = createRefreshToken(user.id)
        await saveRefreshToken(user.id, refreshToken)
        return { user, accessToken, refreshToken }
    } catch (error) {
        return error
    }
}

const register = async (data) => {
    try {
        // Xử lí dữ liệu Input
        const errors = handleDataInput('register', data)
        if (Object.keys(errors).length !== 0) {
            return {
                errCode: 400,
                errors
            }
        }
        // Xử lí dữ liệu khi đầy đủ input
        const checkEmail = await db.users.findOne({
            where: { email: data.email }
        })
        if (checkEmail) {
            return {
                errCode: 401,
                errors: {
                    email: 'Email already exists!'
                }
            }
        }
        // Tạo user mới
        const user = (await db.users.create({
            name: data.name,
            email: data.email,
            image: 'https://res.cloudinary.com/dy57fdikk/image/upload/v1659605718/ezgif-2-2b2c41425d_gws4ug.jpg',
            role: 'R1',
            position: 'P0',
            password: hashPassword(data.password)
        })).get({ plain: true }) // Tương tự set raw: true để delete password
        delete user.password
        const accessToken = createAccessToken(user.id)
        const refreshToken = createRefreshToken(user.id)
        await saveRefreshToken(user.id, refreshToken)
        return {
            user,
            accessToken,
            refreshToken
        }
    } catch (error) {
        return (error)
    }
}
const logout = async (refreshToken)=> {
    try {
        const data = await db.refreshTokens.findOne({
            where: { refreshToken: refreshToken },
        })
        if (!data) {
            return {
                errCode: 403,
                errors: {
                    message: 'Refresh token is not valid!'
                }
            }
        }
        const message = jwt.verify(data.refreshToken, process.env.JWT_REFRESH_SECRET, async (error, dataToken) => {
            if (error) {
                return { message: 'Refresh token is not valid!' }
            }
            await db.refreshTokens.destroy({where: {userId: dataToken.userId}});
            return {
                message: 'You logged out successfully!'
            }
        })
        return message
    } catch (error) { return (error) }
}
module.exports = {
    login: login,
    register: register,
    logout: logout
}