import dotenv from "dotenv";
import cloudinaryModule from "cloudinary";

dotenv.config();
const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: "drnexksco",
  api_key: "213494519468691",
  api_secret: "bDLDkur_wNQN0Zn9L4C2f37B2fk",
});

export default cloudinary;
