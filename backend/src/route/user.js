const express = require("express");
const { z } = require("zod");
const jwt=require("jsonwebtoken");
const { User, Account } = require("../db/db");
const { JWT_SECRET } = require("../../config");
const {signupSchema, signinBody, updateBody} =require("../../zodvalidation");
const { authMiddleware } = require("../../middleware");

const userRouter = express.Router();



// Route for user signup
userRouter.post("/signup", async (req, res) => {
    const { success, error } =signupSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ 
            errors: error.errors
         });
    }
   
     const existinguser=await User.findOne({
           username:req.body.username
     })
      
        if(existinguser)
        {
            res.status(411).json({
                  msg:"user already presnet/invalide input"
            })
        }
   
        // Use create method to save the new user
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        });
        // ones user is created than we can access the detail of each and every user
        // by . operator since user is an object
        // any lang, accessing the detail of object is same 
        // few have differnet but most follow same way to access the data of user
        // one by one

        console.log(newUser);

        const userId = newUser._id;

		/// ----- Create new account ------

        await Account.create({
             userId,
             balance: Math.floor(Math.random() * 10000)
    })

		/// -----  ------
        
       const user_id=newUser._id;
       const user_token=jwt.sign({
             user_id
       },JWT_SECRET);
         

        res.json({
            msg:"user created in the database",
            token:user_token
        });
    
});

// Route for user signin
userRouter.post("/signin",async(req,res)=>{
     
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
     
     // first we find the user find name and password

    const user_name=await User.findOne({
        username:req.body.username,
        password:req.body.password
  })
    
    console.log(user_name);
    
    
    if(user_name===null)
    {
         res.json({
             msg:"user not present in the database"
         })
    }
    else
    {
        if(user_name.username===req.body.username && user_name.password===req.body.password)
            {
                 // if control reahces here than its means user present
                 // in this case we have to create the token
                 const userId=user_name._id;
                 const token=jwt.sign({
                         userId
                 },JWT_SECRET);
                    res.json({
                        msg:"user found",
                        token:token
                   })
                   console.log("login successful");
            }
            else
            {
                res.josn({
                    msg:"user not found"
                },)
            }
    }
   

    // update the user information using put() method

    userRouter.put("/update", authMiddleware, async (req, res) => {
        const { success } = updateBody.safeParse(req.body)
        if (!success) {
            res.status(411).json({
                message: "Error while updating information"
            })
        }
    
            await User.updateOne({ _id: req.userId }, req.body);
        
        res.json({
            message: "Updated successfully"
        })
    })

    // routes to get the data from the database based on provided name

    userRouter.get("/bulk", async (req, res) => {
        const filter = req.query.filter || "";
        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter
                }
            }, {
                lastName: {
                    "$regex": filter
                }
            }]
        })
    
        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    })
      
     
})

module.exports = userRouter;
