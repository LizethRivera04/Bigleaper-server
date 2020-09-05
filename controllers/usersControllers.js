const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

//Add a user 
exports.userCreate = async (req, res) => {
    const { email, password } = req.body;
    try {
        //checks if email exists in DB
        let newUser = await User.findOne({ email })
        if (newUser) {
            res.status(400).json({ msg: 'El usuario ya existe' })
        };
        newUser = new User(req.body);
        //console.log('newUser:', newUser);
        //hashear password
        const salt = await bcryptjs.genSalt(10);
        newUser.password = await bcryptjs.hash(password, salt)
        //save user in DB
        await newUser.save();
        //create jwt
        jwt.sign({ id: newUser._id, email: email, password: password }, process.env.JWT_SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            res.json({ register: true, newUser })
        })
    } catch (err) {
        res.status(400).json({ msg: err })
    }
}
