import { validationResult } from "express-validator";
import RoomModel from "../../mongodb/models/room.js";
import UserModel from "../../mongodb/models/user.js";

const createRoom = async (req, res) => {
    try {
        console.log(req.body);

        const { errors } = validationResult(req);

        if (errors.length) {
            const errorMessages = errors.map((err) => err.msg);

            return res.status(500).json({
                message: errorMessages,
            });
        }

        const user = await UserModel.findOne({
            _id: req.userId,
        });
        console.log(user._doc);
        const doc = new RoomModel({
            name: req.body.name,
            users: [user._id],
        });

        const room = await doc.save();

        const { ...roomData } = room._doc;

        return res.status(200).json({
            message: "Комната создана",
            data: roomData,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "Ошибка создания комнаты",
        });
    }
};

export default createRoom;
