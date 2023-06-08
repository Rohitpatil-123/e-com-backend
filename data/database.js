import mongoose from "mongoose";
mongoose.set("strictQuery", true);
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, connectionParams)
    .then(({ connection: { host } }) => {
      console.log(`Database Connected: ${host}`);
    })
    .catch((error) => {
      console.log(error);
    });
};
