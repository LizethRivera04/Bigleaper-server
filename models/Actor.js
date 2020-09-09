const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActorSchema = new Schema({
    /* actorNumber:{
        type:String,
        required: true,
        unique: true
    }, */
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    companyName: {
        type: String,
        unique: true,
        trim: true
    },
    tradeName: {
        type: String,
        required: true,
        trim: true
    },
    typeCompany: {
        type: String,
        enum: [
            'import/export',
            'carrier',
            'forwarder',
            'customsBroker'
        ]
    },
    rfc: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        trim: true
    },
    telephone: {
        type: Number,
        required: true,
        trim: true
    },
    companyAgent: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Object,
        default: 'guest'
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Actor', ActorSchema);