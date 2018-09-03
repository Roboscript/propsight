var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');



//suburb data Schema
var suburbSchema = mongoose.Schema({
    suburb_name: {
        type: String
    },
    slongitude: {
        type: String
    },
    slatitude: {
        type: String
    }
    
});

// User Schema
var citySchema = mongoose.Schema({
    city_name: {
        type: String
        
    }, 
    clongitude: {
        type: String
    },
    clatitude: {
        type: String
    },
    
    suburbs:[suburbSchema]

});

var City = mongoose.model('City', citySchema);


module.exports = City;
