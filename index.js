import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./src/mongodb/connectDB.js";
import validators from "./src/validations/all_validators.js";
import userHandlers from "./src/handlers/user/userHandlers.js";
import getIdByToken from "./src/utils/getUserIdByToken.js";

const app = express();

app.use(express.json());
app.post("/registration", validators.registration, userHandlers.registration);
app.post("/login", userHandlers.login);
app.get("/auth", getIdByToken, userHandlers.authByToken);

const httpServer = http.createServer(app);
const io = new Server(httpServer);

const PORT = process.env.PORT || 5000;

connectDB();

httpServer.listen(PORT, () => {
    console.log(`server has been started at PORT: ${PORT}`);
});
