const mongoose = require('mongoose');

const taskSchema =  new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,

    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // allows us to create a reference to another model
        ref: 'User'
    }
}, {
    timestamps: true
})

// define a model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
