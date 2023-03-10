import { Server } from "socket.io";
import RoomSchema from "../../mongodb/models/room.js";

const createSocket = async (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("room:join", async (roomId) => {
            console.log(roomId);
            socket.join(roomId);

            const room = await RoomSchema.findById(roomId);
            console.log(room._doc.messages);
            socket.emit("messages:getAll", room._doc.messages);
        });
    });
};

export default createSocket;
