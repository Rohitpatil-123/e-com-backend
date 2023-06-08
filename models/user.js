import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
    default: " ",
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
  resetpasswordtoken: String,
  resetpasswordexpire: String,
});

// userschema.method.getResettokenPassword = function () {
//   const resettoken = crypto.randomBytes(20).toString("hex");
//   console.log(resettoken);
//   this.resetpasswordtoken = crypto
//     .createHash("sha256")
//     .update(resettoken)
//     .digest("hex");
//   this.resetpasswordexpire = Date.now() + 10 * 60 * 1000;
//   return resettoken;
// };

export const user = mongoose.model("user", userschema);
