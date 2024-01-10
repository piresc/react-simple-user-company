const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('User', userSchema);
