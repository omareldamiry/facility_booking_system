const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;