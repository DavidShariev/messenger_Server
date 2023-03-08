import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Room", RoomSchema);
