import jwt from "jsonwebtoken";
import credentials from "../../credentials.js";

const getIdByToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace(/Bearer\s?/, "");

        if (token) {
            try {
                const decoded = jwt.verify(token, credentials.jwtSecret);
                req.userId = decoded._id;
                return next();
            } catch (err) {
                console.log(err.message);
                return res.status(403).json({
                    message: "Вы не авторизованы",
                });
            }
        }
    } catch (err) {
        console.log(err.message);
        return res.json({
            message: "Ошибка на стади расшифровывания токена",
        });
    }
};

export default getIdByToken;
