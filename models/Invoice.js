const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    paid_at: {
        type: Date,
        required: true
    },
    customer: {
        type: mongoose.Schema.ObjectId, 
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
