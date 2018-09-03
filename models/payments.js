var mongoose = require('mongoose');

// payment
var paymentSchema = mongoose.Schema({
    description: {
        type: String,
        index: true
    },
    user:{
        type:String
    },
    amount: {
        type: Number
    },
    reference: {
        type: String
    },
    paynow_reference: {
        type: String
    },
    UpdatedAt: {
        type: Date,
        default: Date.now

    },
    status: {
        type: String,
        default:"Pending"
    }

});





var Payment = mongoose.model('Payment', paymentSchema);


module.exports = Payment;
