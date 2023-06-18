import { order } from "../models/order.js";
import { user } from "../models/user.js";

export const placeorder = async (req, res) => {
  try {
    const data = await user.findById(req.data._id).populate("cart");
    const resdata = await order.create({
      userid: data._id,
      items: data.cart,
      total: data.total,
    });
    if (resdata) {
      (data.cart = []), (data.total = 0);
      await data.save();
      res.status(200).json({
        success: true,
        message: "Order has been Placed",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "something went wrong",
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "error occured",
    });
  }
};

export const getorders = async (req, res) => {
  try {
    const resdata = await order.find({}).populate("items").populate("userid");
    if (resdata) {
      res.status(200).json({
        success: true,
        resdata,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "No Orders",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "error occured",
    });
  }
};
