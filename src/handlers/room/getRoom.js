import RoomModel from "../../mongodb/models/room.js";
import UserModel from "../../mongodb/models/user.js";

const getRoom = async (req, res) => {
    try {
        const room = await RoomModel.findOne({
            _id: req.params.roomId,
        })
            .populate("users")
            .exec();

        return res.status(200).json({
            message: "Данные комнаты получены",
            data: room,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "Ошибка получения данных комнаты",
        });
    }
};

export default getRoom;
