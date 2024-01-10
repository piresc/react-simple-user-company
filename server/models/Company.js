const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: String,
    yearOfCreation: Number,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Company', companySchema);
