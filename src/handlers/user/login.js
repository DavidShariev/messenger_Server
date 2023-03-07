import UserModel from "../../mongodb/models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import credentials from "../../../credentials.js";

const loginHandler = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email,
        });

        if (!user) {
            return res.status(404).json({
                message: "Ошибка авторизации.",
            });
        }

        const isValidPassword = await bcrypt.compare(
            req.body.password,
            user._doc.password
        );

        if (!isValidPassword) {
            return res.status(404).json({
                message: "Ошибка авторизации.",
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            credentials.jwtSecret,
            {
                expiresIn: "30d",
            }
        );

        const { password, ...userData } = user._doc;

        return res.status(200).json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err.message);
        return res.json(500).json({
            message: "Ошибка авторизации.",
        });
    }
};

export default loginHandler;
