const {Router} = require('express');
const userModel = require('../models/user');
const {check} = require("express-validator");
const router = Router();

router.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users?.map((user) => ({
            id: user._id,
            username: user.username,
            status: user.status,
            email: user.email,
            registrationDate: user.registrationDate,
            lastVisit: user.lastVisit
        })));
    } catch (e) {
        res.status(400).json({message: 'Some magic happened, please try again to perform the actions you have done, thank you.'});
    }
});

router.post('/login', [check("username").exists()], async (req, res) => {
    try {
       const {username} = req.body;
       const currentUser = await userModel.findOne({username});

        if(currentUser){
            return res.status(200).json({message: `Hello: ${currentUser.username}`});
        }

        const newUser = new userModel({username});
        await newUser.save();
        res.status(200).json({message: `Hello new user: ${newUser}`});

    } catch (e) {
        res.status(400).json({message: 'Some magic happened, please try again to perform the actions you have done, thank you.'});
    }
})


module.exports = router;
