import CRUDServices from "../services/CRUDServices";

// Hàm truyền vào routes
const getCRUD = async (req, res) => {
    const data = await CRUDServices.getAllUsers()
    return res.render('web.ejs', {users: data})
}

const postCRUD = async (req, res)=> {
    await CRUDServices.createUser(req.body)
    return res.redirect('/')
}

const getInfoUserCRUD = async (req, res)=> {
    if (req.query.id) {
        const dataUser = await CRUDServices.getInfoUserById(req.query.id)
        return res.render('updateUser.ejs', {dataUser: dataUser})
    } else {
        return res.send('User not found!')
    }
}

const putCRUD = async (req, res)=> {
    await CRUDServices.updateUser(req.body)
    return res.redirect('/')
}
const deleteCRUD = async (req, res)=> {
    if (req.query.id) {
        await CRUDServices.deleteUser(req.query.id)
        return res.redirect('/')
    } else {
        return res.send('User not found1')
    }
}
module.exports = {
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getInfoUserCRUD: getInfoUserCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}