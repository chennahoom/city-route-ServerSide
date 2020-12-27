const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    id: { type: Number },
    full_name: { type: String },
    type_of_user: { type: String },
    about_me: { type: String },
    languages: { type: Array },
    email: { type: String },
    phone: { type: String },
}, { collection: 'users' });

const User = model('User', userSchema);

module.exports = User;
