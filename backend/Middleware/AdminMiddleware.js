import UserModal from "../Modals/User.modal.js";
import jwt from 'jsonwebtoken'

export const AdminMiddleware = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) return res.json({ success: false, message: "Token Is Required" })

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodeToken) {
            return res.josn({
                success: false,
                message: "Inavlid Token"
            })
        }

        const userId = decodeToken?.userId

        const user = await UserModal.findById(userId)

        if (!user || user?.role !== 'Admin') {
            return res.json({
                success: false,
                message: "You are Not Admin"
            })
        }
        next()
    }
    catch (error) {
        return res.json({
            success: false,
            message: error
        })
    }
}