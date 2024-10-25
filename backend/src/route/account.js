const express = require('express');
const mongoose=require("mongoose");
const { authMiddleware } = require('../../middleware');
const { Account } = require('../db/db');
const router = express.Router();
 // to get the balance of particular user we write routes here
 router.get("/balance",authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.json({
            balance: account.balance
        });
    } catch (error) {
        console.error("Error fetching account balance:", error);
        res.status(500).json({ message: "An error occurred while fetching the balance" });
    }
});


 
// transfer routes 

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
         console.log("this is money tranfer");
         
    try {
        const { amount, to } = req.body;

        
        if (!amount || !to) {
            return res.status(400).json({ message: "Amount and recipient user ID are required" });
        }

        // Fetch the sender's account
        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Sender account not found" });
        }

        if (account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

       
        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid recipient account" });
        }

        
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();

        res.json({ message: "Transfer successful" });
    } catch (error) {
        console.error("Error during transfer:", error);
        await session.abortTransaction();
        res.status(500).json({ message: "An error occurred during the transfer" });
    } finally {
        session.endSession();
    }
});






module.exports = router;