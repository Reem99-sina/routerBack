const jwt = require("jsonwebtoken")
const userModel = require("../DB/model/user.model")
module.exports.auth = () => {
    return async (req, res, next) => {
        const headertoken = req.headers['authorization']
        if (!headertoken.startsWith(process.env.BEARER)) {
            res.status(401).json({message:"error in token"})
        } else {
            const token = headertoken.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWTCODE)
            if (!decoded) {
                res.json({ message: "In-valid  Token" })
            } else {
                const user = await userModel.findById(decoded.id)
                if (!user) {
                    res.json({ message: "no user has id" })
                } else {
                   
                        req.user = user;
                        next()
                    
                }
            }
        }
    }
}