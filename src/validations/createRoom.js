import { body } from "express-validator";

const createRoomValidator = [
    body("name", "Недопустимое название комнаты").isLength({
        min: 5,
        max: 50,
    }),
];

export default createRoomValidator;
