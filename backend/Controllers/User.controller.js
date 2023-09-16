import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModal from "../Modals/User.modal.js";

export const Register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body.regData;
        if (!name || !email || !password || !role) return res.json({ success: false, message: "All Fields are Required" })

        const isEmailExist = await UserModal.find({ email: email })
        if (isEmailExist.length) {
            return res.json({
                success: false,
                message: "Email Already Exist ,Please try Different Email...."
            })
        }

        const hashPass = await bcrypt.hash(password, 10)

        const user = new UserModal({
            name,
            email,
            password: hashPass,
            role
        })

        await user.save();
        return res.json({
            success: true,
            message: "User Register Successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error
        })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body.loginData;
        if (!email || !password) return res.json({ success: false, message: "All Fields are Required" });

        const user = await UserModal.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: "User Not Found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (isPasswordMatch) {
            const userObj = {
                name: user.name,
                email: user.email,
                _id: user._id,
                role: user.role
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
            // console.log(token, "token")
            return res.json({
                success: true,
                message: "Login Successfully Done",
                userData: userObj,
                token: token
            })
        }


    } catch (error) {
        return res.json({
            success: false,
            message: error
        })
    }
}

export const GetCurrentUser = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.json({ success: false, message: "Token Is Required" })

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodeToken) {
            return res.json({
                success: false,
                message: "Token Not Valid"
            })
        }

        const userId = decodeToken?.userId;

        const user = await UserModal.findById( userId )
        if (!user) {
            return res.json({
                success: false,
                message: "User Not Found"
            })
        }

        const userObj = {
            name: user.name,
            email: user.email,
            _id: user._id,
            role: user.role
        }

        return res.json({ success: true, userData: userObj })

    } catch (error) {
        return res.json({
            success: false,
            message: error
        })
    }
}