const express = require('express');
require('./db/mongoose'); //it won't import anything from the file, it will just make sure that it execute that file.
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

// register a middleware to do something before call route handlers
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled');
//     } else {
//         next();
//     }
//     // call the route handler
//     // next();
// })
 
// register a middleware to do something before call route handlers
// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Please check back soon!')
// })

//file uploads

// const multer = require('multer');
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('File must be a DOC'));
//         }

//         cb(undefined, true);

//         // cb(new Error('File must be a PDF')); //send error
//         // cb(undefined, true); //accept upload
//         // cb(undefined, false); //reject upload

//     }
// })
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send();
// })


//it parse incoming json to an object so we can access in req handler
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log('server is up on port ', port);
})

// const jwt = require('jsonwebtoken');
// const myFunction = async () => {
//     const token = jwt.sign({
//         _id: 'abc123'
//     }, 'thisismynewcourse', { expiresIn: '7 days'});
//     console.log(token);

//     const data = jwt.verify(token, 'thisismynewcourse');
//     console.log(data);
// }

// myFunction();

// const pet = {
//     name: 'Hat'
// }
// console.log(JSON.stringify(pet));

// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
//     // const task = await Task.findById('5eb11f864e3373a684aeb5fb');
//     // // populate allows us to populate data from a relationship
//     // await task.populate('owner').execPopulate();
//     // console.log(task.owner);

//     const user = await User.findById('5eb11ebcdd8a9949e15c7bc4');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);

// }

// main();