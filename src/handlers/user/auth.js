import credentials from "../../../credentials.js";
import UserModel from "../../mongodb/models/user.js";
import jwt from "jsonwebtoken";

const authByToken = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            _id: req.userId,
        });

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден",
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

        return res.status(200).json({
            message: "Вы успешно авторизованы",
            userData: user._doc,
            token,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "Ошибка получения данных пользователя.",
        });
    }
};

export default authByToken;
