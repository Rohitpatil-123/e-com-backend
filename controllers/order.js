import { order } from "../models/order.js";
import { user } from "../models/user.js";
import Razorpay from "razorpay";

export const saveorder = async (req, res) => {
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

export const placeorder = async (req, res) => {
  const data = await user.findById(req.data._id).populate("cart");
  try {
    var instance = new Razorpay({
      key_id: "rzp_test_g7U49db3NjnkdM",
      key_secret: "KyiRX55bjR14JoDS0lb8hcld",
    });

    var options = {
      amount: data.total * 100,
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    instance.orders.create(options, function (err, order) {
      console.log(order);
      res.status(200).json({
        success: true,
        data: order,
      });
    });
    // const resdata = await order.create({
    //   userid: data._id,
    //   items: data.cart,
    //   total: data.total,
    // });
    // if (resdata) {
    //   (data.cart = []), (data.total = 0);
    //   await data.save();
    //   res.status(200).json({
    //     success: true,
    //     message: "Order has been Placed",
    //   });
    // } else {
    //   res.status(200).json({
    //     success: false,
    //     message: "something went wrong",
    //   });
    // }
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

export const deleteorder = async (req, res) => {
  const id = req.params.id;
  const query = { _id: id };
  const data = await order.deleteOne(query);

  if (!data) {
    res.status(404).json({
      success: false,
      message: "some error",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "order completed",
    });
  }
};

export const getuserorders = async (req, res) => {
  const id = req.params.id;
  const data = await order.find({ userid: id });
  if (data) {
    res.status(200).json({
      success: true,
      data,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "no orders",
    });
  }
};
