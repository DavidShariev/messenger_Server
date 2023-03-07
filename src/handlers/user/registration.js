import { validationResult } from "express-validator";
import UserModel from "../../mongodb/models/user.js";
import bcrypt from "bcrypt";
import credentials from "../../../credentials.js";
import jwt from "jsonwebtoken";

const registrationHandler = async (req, res) => {
    try {
        const { errors } = validationResult(req);

        if (errors.length) {
            const errorMessages = errors.map((err) => err.msg);
            console.log(errorMessages);

            return res.status(500).json({
                message: errorMessages,
            });
        }
        console.log(req.body);
        const salt = await bcrypt.genSalt(credentials.salt);
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        const doc = new UserModel({
            username: req.body.username,
            password: passwordHash,
            email: req.body.email,
            avatarURL: req.body.avatarURL,
        });

        const user = await doc.save();

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
            message: "Вы успешно зарегестрированы",
            userData,
            token,
        });
    } catch (err) {
        console.log(err.message);
        return res.json({
            message: "Ошибка регистрации.",
        });
    }
};

export default registrationHandler;
