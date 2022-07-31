import db from '../models/index'
const { Op } = require("sequelize");

const searchPostTitle = async (titleSearch) => {
    try {
        const data = await db.posts.findAll({
            where: { title: {
                [Op.iLike]: '%' + titleSearch + '%'
            }},
            include: [
                {model: db.users, attributes: ['name', 'image']}
            ],
            order: [
                ['id', 'DESC']
            ]
        })
        return {
            posts: data
        }
    } catch (error) { return (error) }
}

const searchUserEmail = async (emailSearch) => {
    try {
        const data = await db.users.findOne({
            where: { email: {
                [Op.iLike]: '%' + emailSearch + '%'
            }},
            attributes: {
                exclude: ['password'] //Khong tra ra password
            },
        })
        return {
            user: data
        }
    } catch (error) { return (error) }
}

module.exports = {
    searchPostTitle: searchPostTitle,
    searchUserEmail: searchUserEmail,
}