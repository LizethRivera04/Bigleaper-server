const express = require('express');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Actor = require('../models/Actor');
const User = require('../models/User');

//Actor creation
exports.actorCreate = async (req, res) => {

    try {
        generateEmailActor(req, res)
        const newActor = new Actor(req.body);
        newActor.creator = req.userId;
        const actor = await newActor.save();
        //await newGuestUser.save();
        if (!actor) throw Error('Algo salió mal al guardar al nuevo actor')
        res.status(200).json(actor);
    } catch (err) {
        res.status(500).send(err);
    }
}

const generateEmailActor = async (req, res) => {
    const { companyName, tradeName, typeCompany, rfc, adress, telephone, compantAgent, email, password } = req.body;
    console.log(req.body);
    let newGuestUser = await User.findOne({ email })
    if (newGuestUser) {
        res.status(400).json({ msg: 'El usuario ya existe' })
    };
    newGuestUser = new User({ email, password, guest: true });
    console.log(newGuestUser);
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
        res.status(200).json({ actor })
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
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