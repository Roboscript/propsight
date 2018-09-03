var mongoose = require('mongoose');


// suburb 
var suburbSchema = mongoose.Schema({
        suburb_name: {
            type: String
        },
        year: {
            type: Number
        },
        size: {
            type: Number
        },
        kitchen: {
            type: String
        },
        dining: {
            type: String
        },
        borehole: {
            type: String
        },
        list_price: {
            type: Number
        },
        sell_price: {
            type: Number
        },
        title: {
            type: String
        },
        bedrooms: {
            type: Number
        }
    
    
});






var Property = mongoose.model('Property', suburbSchema);


module.exports = Property;
