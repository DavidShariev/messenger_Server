import mongoose from "mongoose";
import credentials from "../../credentials.js";

const connectDB = () => {
    mongoose
        .connect(
            `mongodb+srv://admin:${credentials.mongoDBPass}@cluster0.xabf9ex.mongodb.net/main?retryWrites=true&w=majority`
        )
        .then(() => {
            console.log("database is connected");
        })
        .catch((err) => {
            console.log(`database err: ${err.message}`);
        });
};
export default connectDB;
