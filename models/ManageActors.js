const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ManageActorsSchema = new Schema({
    currentOriginCarrier: {
        type: String
    },
    originCarrierAgent: {
        type: String
    },
    currentForwarder: {
        type: String
    },
    forwarderAgent: {
        type: String
    },
    currentCustomsBroker: {
        type: String
    },
    customBrokerAgent: {
        type: String
    },
    currentDestinyCarrier: {
        type: String
    },
    destinyCarrierAgent: {
        type: String
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    folioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Export Folio'
    },
    date: {
        type: Date,
        default: Date.now()
    }

})


module.exports = mongoose.model('ManageActors', ManageActorsSchema);