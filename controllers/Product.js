import { product } from "../models/product.js";
import { user } from "../models/user.js";

export const addproduct = async (req, res) => {
  const { name, price, description, category } = req.body;

  const data = await product.create({ name, price, description, category });

  if (data) {
    return res.status(200).json({
      success: true,
      message: "data added successfully",
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "error occered",
    });
  }
};

export const getproduct = async (req, res) => {
  const data = await product.find({});
  return res.status(200).json({
    success: true,
    data,
  });
};

export const getpertiprod = async (req, res) => {
  try {
    const prod = req.params.id;
    const data = await product.find({ category: prod });

    if (data.length == 0) {
      return res
        .status(404)
        .json({ success: false, message: "invalid filter data not found" });
    } else {
      return res.status(200).json({
        success: true,
        data,
      });
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export const addcart = async (req, res) => {
  try {
    const data = await user.findOne(req.data._id);
    const prodid = req.params.id;
    const dat = await product.findById(prodid);
    data.total += dat.price;
    data.cart.push(prodid);
    await data.save();

    return res.status(200).json({
      success: true,
      message: "added to cart",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error,
    });
  }
};

export const getcart = async (req, res) => {
  try {
    //   let cartdata = [];
    const data = await user.findById(req.data._id).populate("cart");
    if (data.cart.length == 0) {
      return res
        .status(200)
        .json({ success: false, message: "cart is empty", total: data.total });
    } else {
      // const cartdata = await product.findById({
      //   _id: { $in: data.cart },
      // });
      // for (let i = 0; i < data.cart.length; i++) {
      //   const dat = await product.findById(data.cart[i]);
      //   cartdata.push(dat);
      // }

      return res.status(200).json({
        success: true,
        cartdata: data.cart,
        total: data.total,
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
};

export const deletecart = async (req, res) => {
  const data = await user.findById(req.data._id);
  if (data.cart.length == 0) {
    return res.status(404).json({
      success: false,
      message: "cart is empty can't delete",
    });
  } else {
    const prodid = req.params.id;
    const index = data.cart.indexOf(prodid);
    const dat = await product.findById(prodid);
    data.total -= dat.price;
    data.cart.splice(index, 1);
    await data.save();
    res.status(200).json({
      success: true,
      message: "product removed from cart",
      total: data.total,
    });
  }
};
