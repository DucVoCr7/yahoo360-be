import bcrypt from "bcryptjs"
import db from '../models/index'

const hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}
export const createUser = (data) => {
    // roleId: DataTypes.STRING,
    // name: DataTypes.STRING,
    // image: DataTypes.STRING,
    // email: DataTypes.STRING,
    // password: DataTypes.STRING,
    // gender: DataTypes.BOOLEAN,
    // phoneNumber: DataTypes.STRING,
    // address: DataTypes.STRING,
    // position: DataTypes.STRING
    return new Promise(async (resolve, reject) => {
        try {
            const passwordHasHash = await hashPassword(data.password)
            await db.users.create({
                ...data,
                password: passwordHasHash
            })
            resolve('Create new user success!')
        } catch (error) {
            reject(error)
        }
    })
}

