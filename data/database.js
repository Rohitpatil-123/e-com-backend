import mongoose from "mongoose";
mongoose.set("strictQuery", true);
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(({ connection: { host } }) => {
      console.log(`Database Connected: ${host}`);
    })
    .catch((error) => {
      console.log(error);
    });
};
