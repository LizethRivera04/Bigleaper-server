const express = require('express');
const mongoose = require('mongoose')
const ExportFolio = require('../models/ExportFolios');


//exportfolios creation
exports.exportFolioCreate = async (req, res) => {
    try {
        const newfolio = new ExportFolio(req.body);
        newfolio.creatorId = req.userId;
        const folio = await newfolio.save();
        if (!folio) throw Error('Algo salió mal al guardar al nuevo folio')
        res.status(200).json(folio);
    } catch (err) {
        res.status(500).send(err);
    }
}


//Get all exportfolios
exports.exportFolioList = async (req, res) => {
    try {
        const exportfolio = await ExportFolio.find({ creatorId: req.userId });
        if (!exportfolio) throw Error('Algo salió mal al obtener todos los actores');
        res.status(200).json(exportfolio)
    } catch (err) {
        console.log(err)
        res.status(400).send('Hubo error al obtener todos los exportfolios')
    }
}



//Get an exportfolio
exports.exportfolio = async (req, res) => {
    try {
        const exportfolio = await ExportFolio.findById(req.params.id);
        if (!exportfolio) {
            res.status(404).json({ msg: 'No se encontró el folio' })
        }
        res.status(200).json(exportfolio)
    } catch (err) {
        console.log(err);
        res.status(400).send('Hubo un error al obtener el folio')
    }
}






