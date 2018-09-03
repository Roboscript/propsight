var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');





// User Schema
var userSchema = mongoose.Schema({
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    username: {
        type: String
    },
     country: {
        type: String
    },
    department: {
        type: String
    },
    title: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    join_date: {
                type: Date,
                default: Date.now
    }, 
    cell: {

        type: String
    }

});
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);