const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ExportFolioSchema = new Schema({
    createDate: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    counterPart: {
        type: String,
        required: true
    },
    incoterm: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productAmount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    originCountry: {
        type: String,
        required: true
    },
    destinationCountry: {
        type: String,
        required: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


module.exports = mongoose.model('ExportFolio', ExportFolioSchema);