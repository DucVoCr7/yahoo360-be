import jwt from 'jsonwebtoken'
import 'dotenv/config'

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, data) => {
            if (error) {
                return res.status(403).json({ message: 'Token is not valid!' })
            }
            req.dataToken = data.userId
            next()
        })
    } else {
        return res.status(401).json({ message: 'You are not 11 authenticated!' })
    }
}

export default verifyToken