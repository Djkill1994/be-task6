const {Router} = require('express');
const messageModel = require('../models/message');
const {check} = require("express-validator");
const router = Router();

router.get('/', check("username").exists(), async (req, res) => {
    try {
        const {username} = req.query;
        const messages = await messageModel.find();
        const reversedMassages = await messages.reverse()
        res.status(200).json(reversedMassages?.filter((message) => message.receiver === username)?.map((message) => ({
            id: message._id,
            sender: message.sender,
            receiver: message.receiver,
            title: message.title,
            body: message.body,
            date: message.date,
        })));
    } catch (e) {
        res.status(400).json({message: 'Some magic happened, please try again to perform the actions you have done, thank you.'});
    }
})

router.post('/send', [check(["sender", "receiver", "body", "title"]).exists()], async (req, res) => {
    try {
        const {sender, receiver, title, body} = req.body;
        const newMessage = new messageModel({
            sender,
            receiver,
            title,
            body,
            date: new Date().toLocaleString("en-US", {timeZone: "Europe/Minsk"})
        });
        await newMessage.save();
        return res.status(200).json();

    } catch (e) {
        res.status(400).json({message: 'Some magic happened, please try again to perform the actions you have done, thank you.'});
    }
})

module.exports = router;
