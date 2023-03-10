import RoomSchema from "../../mongodb/models/room.js";

const addMessage = async (req, res) => {
    try {
        const room = await RoomSchema.findByIdAndUpdate(
            req.params.roomId,
            {
                $push: { messages: req.body.message },
            },
            {
                populate: "users",
                returnDocuument: "after",
            }
        );

        return res.status(200).json({
            messages: [...room._doc.messages, req.body.message],
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: err.message,
        });
    }
};

export default addMessage;
