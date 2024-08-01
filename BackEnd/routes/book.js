const router = require ("express").Router()

const User = require("../models/user")
// const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth")
const Book = require("../models/book")

// add book by admin
router.post ("/add-book", authenticateToken, async(req, res) =>{
    try{
        const {id} = req.headers //this is to check if it is user or admin
       const user =  await User.findById(id)
       if(user.role !== "admin"){
       return res.status(400).json({message:"You Do Not Have Access To Perform Admin Work"});

       }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        })
await book.save()
res.status(200).json({message:"Book Added Successfully"});

    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
})

//updatebook
router.put("/update-book", authenticateToken,async (req,res) => {
    try{
        const {bookid} = req.headers; //headrs me se book id bhenjenge
        await Book.findByIdAndUpdate (bookid,{ // book find karenge by findByIdAndUpdat
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,

        });
        return res.status(200).json ({
            message:"Book Updated Successfully!"
        });
        
    }
    catch(error){

        return res.status(500).json ({message: "An Error Occured!"})
    }
});

//deletion of a book
router.delete("/delete-book", authenticateToken,async (req,res) => {
    try{
        const {bookid} = req.headers; //headrs me se book id bhenjenge
        await Book.findByIdAndDelete (bookid)

        
        return res.status(200).json ({
            message:"Book Deleted Successfully!"
        });
        
    }
    catch(error){

        return res.status(500).json ({message: "An Error Occured!"})
    }
});


//api to get all books at thunderClient
router.get("/get-all-books",async (req,res) => {
    try{
        const books = await Book.find().sort({ createdAt: -1}) // createdAt: -1 this wil show books at he top which were created latest 
        return res.json({status: "Success", data: books,})
     }
    catch(error){

        return res.status(500).json ({message: "An Error Occured!"})
    }
});

//THESE FOLLOWING API ARE FOR THE PUBLIC OR THE USERS AND NOT FOR ADMIN
// get-recent-books
// get-book-by-id


//api to get Recently Added Books limit to 4 only matlab 4 hi books dikgayega main page pe
router.get("/get-recent-books",async (req,res) => {
    try{
        const books = await Book.find().sort({ createdAt: -1}).limit(4) // createdAt: -1 this wil show books at he top which were created latest 
        return res.json({status: "Success", data: books,})
     }
    catch(error){

        return res.status(500).json ({message: "An Error Occured!"})
    }
});


//get book by id this will show book descripption "we will get book by id here"
router.get("/get-book-by-id/:id",async (req,res) => {
    try{
        const {id} = req.params; // we are using parametrs here to get the id or we can also use heards to get the id
        const book = await Book.findById(id)
        return res.json({
            status:"Success",
            data:book,
        })
     }
    catch(error){

        return res.status(500).json ({message: "An Error Occured!"})
    }
});



module.exports = router;
