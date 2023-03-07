import mongoose from "mongoose";

const Room = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
});

export default mongoose.model("Room", RoomSchema);
