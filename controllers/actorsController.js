const express = require('express');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Actor = require('../models/Actor');
const User = require('../models/User');

//Actor creation
exports.actorCreate = async (req, res) => {
    try {
        const newActor = new Actor(req.body);
        newActor.creator = req.userId;
        const actor = await newActor.save();
        generateEmailActor(req, res, actor._id)
        if (!actor) throw Error('Algo salió mal al guardar al nuevo actor')
        res.status(200).json(actor);
    } catch (err) {
        res.status(500).send(err);
    }
}



//generate email with guest: true POST/actor
const generateEmailActor = async (req, res, actorId) => {
    try {
        const { companyName, tradeName, typeCompany, rfc, adress, telephone, compantAgent, email, password } = req.body;
        let newGuestUser = await User.findOne({ email })
        if (newGuestUser) {
            res.status(400).json({ msg: 'El usuario ya existe' })
        };
        newGuestUser = new User({ email, password, guest: true });
        newGuestUser.actor = actorId;
        const salt = await bcryptjs.genSalt(10);
        newGuestUser.password = await bcryptjs.hash(password, salt)
        //save user in DB
        await newGuestUser.save();
        //create jwt
        jwt.sign({ id: newGuestUser._id, email: email, password: password }, process.env.JWT_SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            console.log({ register: true, newGuestUser })
        })
    } catch (err) {
        console.log(err)
    }
}


//Update an actor
exports.actorUpdate = async (req, res) => {
    try {
        let actor = await Actor.findById(req.params.id)
        if (!actor) {
            return res.status(404).json({ msg: 'Actor no encontrado' })
        }
        if (actor.creator.toString() !== req.userId) {
            return res.status(401).json({ msg: 'No autorizado' });
        }
        actor = await Actor.findByIdAndUpdate(req.params.id, req.body, { new: true })
        modificationEmailActor(req, res, actor._id)
        res.status(200).json({ actor })
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}


//modification email and password PUT/actor
const modificationEmailActor = async (req, res, actorId) => {
    try {
        const { companyName, tradeName, typeCompany, rfc, adress, telephone, compantAgent, email, password } = req.body;
        //hashear password
        const salt = await bcryptjs.genSalt(10);
        let updateUser = {
            email: email,
            password: await bcryptjs.hash(password, salt),
            guest: true
        }
        const guestUser = await User.findOneAndUpdate({ actor: req.params.id }, updateUser, { new: true });
        if (!guestUser) {
            console.log({ updateguest: false })
        }
        console.log({ updateguest: true, guestUser })
    } catch (err) {
        console.log(err);
    }
}



//Get all actors
exports.actorsList = async (req, res) => {
    try {
        console.log(req.userId);
        const actors = await Actor.find({ creator: req.userId }).sort({ date: -1 });
        if (!actors) throw Error('Algo salió mal al obtener todos los actores');
        res.status(200).json(actors)
    } catch (err) {
        console.log(err)
        res.status(400).send('Hubo error al obtener todos los actores')
    }
}



//Get an actor
exports.actor = async (req, res) => {
    try {
        const actor = await Actor.findById(req.params.id);
        if (!actor) {
            res.status(404).json({ msg: 'No se encontró al actor' })
        }
        res.status(200).json(actor)
    } catch (err) {
        console.log(err);
        res.status(400).send('Hubo un error al obtener al actor')
    }
}


//Delete an actor
exports.actorDelete = async (req, res) => {
    try {
        const actor = await Actor.findByIdAndRemove(req.params.id);
        if (!actor) {
            res.status(404).json({ msg: 'No se encontró al actor' })
        }
        res.status(200).json(actor);
    } catch (err) {
        console.log(err);
        res.status(400).send('Hubo un error al eliminar el actor');
    }
}