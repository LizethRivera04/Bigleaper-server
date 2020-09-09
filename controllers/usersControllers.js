const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

//Add a new user (email, password)
exports.userCreate = async (req, res) => {
    const { email, password } = req.body;
    try {
        //checks if email exists in DB
        let newUser = await User.findOne({ email })
        if (newUser) {
            res.status(400).json({ msg: 'El usuario ya existe' })
        };
        newUser = new User(req.body);
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



//Get a list of users guests
exports.usersList = async (req, res) => {
    try {
        const usersGuests = await User.find({ creator: req.userId })
        if (!usersGuests) {
            res.status(404).json('No hay usuarios guest asociados con tu cuenta')
        }
        res.status(200).json(usersGuests);
    } catch (error) {
        res.status(403).json({ msg: 'No tienes permiso para obtener datos de los guests' });
    }

}