var mongoose = require('mongoose');



// Membership Type Schema
var membershipSchema = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    reference: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    },
    area_search: {
        type: Number
    },
    title_search: {
        type: Number
    },
    user: {
        type: String
    },
    join_date: { type: Date, default: Date.now
    },
    expiry_date: {
        type: String
    },
    reports: {
        type: Number
    }
});


var Membership = mongoose.model('Membership', membershipSchema);


module.exports = Membership;
