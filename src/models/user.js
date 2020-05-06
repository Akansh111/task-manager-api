const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

// we define schema to take the advantage of middleware.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password should not contain password keyword')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

// add a virtual property on schema which actually doesn't get stored in database
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// res.send always send back the stringified object.
// whenever user object get stringifed, toJSON method gets called.
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}

// if we want to call a function on the instance rather than on the model
// methods method are accessible on instances
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET);
    
    //saving token to db
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

//custom function on user schema
// statics method are accessible on Models
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login'); 
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

// event before user is saved
// this event will get fired before every save call
// hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    // checking if the password is already hashed or not.
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    // we call next to tell that we are done with the execution before saving
    next();
})

// delete user task when user is removed
userSchema.pre('remove', async function(next) {
    const user = this;
    await Task.deleteMany({ owner: user._id })
    next();
})

// define a model
const User = mongoose.model('User', userSchema);

module.exports = User;