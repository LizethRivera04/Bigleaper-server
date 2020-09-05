const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        //delete spaces
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    guest: {
        type: Boolean,
        default: false,

    }

})

module.exports = mongoose.model('User', UserSchema);