import User from "../models/user.model.js"
import jwt from "jsonwebtoken"


export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.cookies || {}
        if (!token) {
            return res.status(200).json(null)
        }

        let decoded
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch {
            return res.status(200).json(null)
        }

        const userId = decoded?.userId
        if (!userId) {
            return res.status(200).json(null)
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(200).json(null)
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `failed to get currentUser ${error}` })
    }
}
