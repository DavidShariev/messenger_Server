import RoomSchema from "../../mongodb/models/room.js";

const getAllRooms = async (req, res) => {
    try {
        let rooms = await RoomSchema.find().populate("users").exec();

        return res.status(200).json({
            message: "Комнаты получены",
            data: rooms,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "Ошибка получения списка комнат",
        });
    }
};

export default getAllRooms;
