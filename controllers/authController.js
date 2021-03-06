const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//User authentication
exports.userAuthentication = async (req, res) => {
    const { email, password } = req.body;

    try {
        //checks if user exists in DB
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'El usuario no existe' })
        }
        //checks is password is correct
        const passCorrect = await bcryptjs.compare(password, user.password)
        if (!passCorrect) {
            return res.status(401).json({ msg: 'Password incorrecto' })
        }
        //create jwt
        jwt.sign({ id: user._id, email: email, password: password }, process.env.JWT_SECRET, {
            expiresIn: 86400
        }, (error, token) => {
            if (error) {
                res.send(error)
            }
            res.send({ auth: true, token })
        })
    } catch (err) {
        console.log(err)
    }
}