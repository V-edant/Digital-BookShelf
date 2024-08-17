//here the book that are in csaart are being transfered tto the order section which cant be deleted by the user or admin. here the books in the cart are being ordered.


const router = require("express").Router()
const {authenticateToken} = require ("./userAuth")
const Book= require("../models/book")
const Order = require("../models/order")
const User = require("../models/user")

//api for place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order) {                                                                                                                            //jo orderdata hai postman me usme se har ek object ko lera hai or ek naya order-instance crrearte kkrra hai taki naya order creae ho jaye db me
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();

            // Saving order in user model
            await User.findByIdAndUpdate(id, {                                                                                                           //jo model ke andat jo user.js hai usme order wale array ko iupdate kkra hai
                $push: { orders: orderDataFromDb._id },
            });

            // Clearing cart
            await User.findByIdAndUpdate(id, {                                                                                                      //ek baar order place hjo gya toh remove cart
                $pull: { cart: orderData._id },
            });
        }

        return res.json({
            status: "success",
            message: "Order Placed Successfully!"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//api for getting order history of a user 
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
       const userData = await User.findById(id).populate({
        path : "orders",
        populate: {path : "book"},
       })

       const ordersData = userData.orders.reverse();
       return res.json ({
        status : "Success",
        data : ordersData,
       })
        
        

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


//get all order by admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find()
        .populate({
            path : "book",
        })
        .populate({
            path : "user",                                                                                                                                      //so admin could know which user it is
        })
        .sort({ createdAt : -1})
        return res.json ({
            status : "Success",
            data : userData,
        })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//order update by addmin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
       const {id} = req.params;
       await Order.findByIdAndUpdate(id, {status : req.body.status})
       return res.json({
        status: "Success",
        message : "Status Updated Successfully"
       })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router