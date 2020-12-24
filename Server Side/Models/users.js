const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    id: { type: Number },
    full_name: { type: String },
    email: { type: String },
    phone: { type: Number },
    languages: { type: String },
}, { collection: 'users' });

const User = model('User', userSchema);

module.exports = User;
