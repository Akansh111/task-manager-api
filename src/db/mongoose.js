const mongoose = require('mongoose');

//db name in the connection URL itself.
const connectionURL = process.env.MONGODB_URL;

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})



// // create a instance of that model
// const me = new User({
//     name: 'Akansh ',
//     // age: -98,
//     email: '  AKansh111@gmail.com',
//     password: ' 123password'
// })

// // save the data to database
// me.save().then((me) => {
//     console.log("me ", me);
// }).catch((error) => {
//     console.log('Error!:', error);
// })


// const task = new Task({
//     description: 'Had breakfast',
//     completed: false
// })

// task.save().then((task) => {
//     console.log("task ", task)
// }).catch((error) => {
//     console.log('error', error);
// })

