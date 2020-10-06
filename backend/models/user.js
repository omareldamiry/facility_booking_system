const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    birthdate: { type: Date, required: false },
    occupation: { type: String, required: false },
    phone: { type: String, required: false },
    bio: { type: String, required: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;