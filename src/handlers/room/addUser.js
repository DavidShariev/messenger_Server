import RoomModel from "../../mongodb/models/room.js";
import UserModel from "../../mongodb/models/user.js";

const addUser = async (req, res) => {
    try {
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "Ошибка добавления пользователя",
        });
    }
};

export default addUser;
