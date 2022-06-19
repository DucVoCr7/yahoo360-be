import webServices from "../services/webServices";

const helloServer = async (req, res) => {
    const data = await webServices.helloServer()
    return res.render('web.ejs', {data: data})
}
module.exports = {
    helloServer: helloServer,
}