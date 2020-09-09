const express = require('express');
const mongoose = require('mongoose')
const ManageActors = require('../models/ManageActors');
const ExportFolio = require('../models/ExportFolios');

//*Routes in routes/exportFolios.js

//Manageactors creation
exports.manageActorsCreate = async (req, res) => {
    try {
        let manageActorsDb = await ManageActors.find({ folioId: req.params.id })
        if (manageActorsDb.length !== 0) {
            return res.status(404).json({ msg: 'Ya existen los manage actors de este folio, si desea actualizarlos use el método PUT' })
        }
        const newManageActors = new ManageActors(req.body);
        newManageActors.creator = req.userId;
        newManageActors.folioId = req.params.id
        const manageActors = await newManageActors.save();
        if (!manageActors) throw Error('Algo salió mal al guardar los actors')
        res.status(200).json(manageActors);
    } catch (err) {
        res.status(500).send(err);
    }
}



//Update manage actors from an exportfolio
exports.manageActorsUpdate = async (req, res) => {
    try {
        let manageActors = await ManageActors.find({ folioId: req.params.id })
        console.log(manageActors[0]);
        if (!manageActors) {
            return res.status(404).json({ msg: 'Manageactor no encontrado' })
        }
        if (manageActors[0].creator.toString() !== req.userId) {
            return res.status(401).json({ msg: 'No autorizado' });
        }
        manageActors = await ManageActors.findOneAndUpdate({ folioId: req.params.id }, req.body, { new: true })
        res.status(200).json({ manageActors })
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
/* "currentForwarder":"Ibimex, S.A. de C.V.",
"forwarderAgent":"Julio Ibimex",
"currentCustomsBroker": "Promotora Empresarial Internacional PROMETEX,S.A de C.V",
"customBrokerAgent":"Raúl Prometex",
"currentDestinyCarrier":"Grupo Pascal,S.A de C.V",
"destinyCarrierAgent":"Alberto Pascal"
 */

//Get manage actors from a export folio
exports.manageActorsFolio = async (req, res) => {
    try {
        console.log(req.userId);
        const manageActors = await ManageActors.find({ folioId: req.params.id });
        if (manageActors[0].creator.toString() !== req.userId) {
            return res.status(401).json({ msg: 'No autorizado' });
        }
        if (!manageActors) throw Error('Algo salió mal al obtener  los manageactors de este folio');
        res.status(200).json(manageActors)
    } catch (err) {
        console.log(err)
        res.status(400).send('Hubo error al obtener todos los actores')
    }
}

