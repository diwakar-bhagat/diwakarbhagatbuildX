import jwt from "jsonwebtoken"


const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies

        if (!token) {
            return res.status(401).json({ message: "Authentication required. Please log in." })
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!verifyToken) {
            return res.status(401).json({ message: "Invalid or expired token. Please log in again." })
        }
        req.userId = verifyToken.userId

        next()

    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Invalid or expired token. Please log in again." })
        }
        return res.status(500).json({ message: `Authentication error: ${error.message}` })
    }

}

export default isAuth