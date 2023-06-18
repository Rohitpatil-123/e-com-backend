import { product } from "../models/product.js";
import { user } from "../models/user.js";
import cloudinary from "../middlewares/Cloudinary.js";
export const addproduct = async (req, res) => {
  const { name, price, description, category, image } = req.body;
  try {
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "onlineShop",
      });
      if (uploadedResponse) {
        const data = await product.create({
          name,
          price,
          description,
          category,
          image: uploadedResponse,
        });
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
      }
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error,
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
    const cartitem = await user.findById(req.data._id);
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
      let countObject = cartitem.cart.reduce(function (count, currentValue) {
        return (
          count[currentValue]
            ? ++count[currentValue]
            : (count[currentValue] = 1),
          count
        );
      }, {});
      let list = Object.values(countObject);
      return res.status(200).json({
        success: true,
        cartdata: data.cart.filter(
          (item, index) => data.cart.indexOf(item) === index
        ),
        total: data.total,
        list,
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
    // for(let i=0;i<data.cart.length;i++){
    //   if(prodid===data.cart[i]){

    //   }
    // }
    const index = data.cart.indexOf(prodid);
    if (index == -1) {
      res.status(404).json({
        success: false,
        message: "element is not in the cart",
      });
    } else {
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
  }
};

export const deleteproduct = async (req, res) => {
  try {
    const prodid = req.params.id;
    const data = await product.findOne({ _id: prodid });
    console.log(data._id);
    if (!data) {
      return res.status(200).json({
        success: false,
        message: "product not found",
      });
    } else {
      const query = { _id: prodid };

      const deletestatus = await product.deleteOne(query);
      if (!deletestatus) {
        return res
          .status(200)
          .json({ success: false, message: "some error occured" });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "product deleted" });
      }
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
    });
  }
};

export const products = async (req, res) => {
  try {
    const prodid = req.params.id;
    const data = await product.find({ _id: prodid });
    if (data) {
      res.status(200).json({
        success: true,
        data,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "data not found",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: true,
      message: "error",
    });
  }
};
