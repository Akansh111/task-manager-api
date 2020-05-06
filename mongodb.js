// CRUD

const mongodb = require('mongodb');

//initialize the connection
const MongoClient = mongodb.MongoClient;

//grab Object ID (to generate own IDs)
const ObjectID = mongodb.ObjectID;

//connection url and database
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    //DELETING DOCUMENTS
    // db.collection('users').deleteOne({
    //     _id: new ObjectID("5ead1939f8bd915d99147fdd")
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('tasks').deleteOne({
    //     description: "Had lunch"
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    //----------------------------------------------------------------

    //UPDATING DOCUMENTS
    // db.collection('users').updateOne({
    //     _id: new ObjectID("5ead1939f8bd915d99147fdd")
    // }, {
    //     // $set: {
    //     //     name: 'Abhishek'
    //     // }
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    //----------------------------------------------------------------

    //READING DOCUMENTS
    // db.collection('users').findOne({ _id: new ObjectID("5ead1b5c03014a3d9175f39d") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user);
    // })

    // db.collection('users').find({ age: 26 }).toArray((error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user);
    // })

    // db.collection('users').find({ age: 26 }).count((error, count) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(count);
    // })

    // db.collection('tasks').findOne({ _id: ObjectID("5ead1c3461cbb83ba94f9c1e")}, (error, task) => {
    //     console.log(task);
    // })

    // db.collection('tasks').find({ completed: true }).toArray((error, task) => {
    //     console.log(task);
    // })

    //----------------------------------------------------------------

    // INSERTING DOCUMENTS
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Vikram',
    //     age: 29
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }

    //     // returns an array of added documents
    //     console.log(result.ops);
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Rashi',
    //         age: 20
    //     },
    //     {
    //         name: 'Goel',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents');
    //     }

    //     console.log(result.ops);
    // })

    db.collection('tasks').insertMany([
        {
            description: 'Had brunch',
            completed: true
        },
        {
            description: 'Had snacks',
            completed: true
        },
        {
            description: 'Had dinner',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks');
        }

        console.log(result.ops);
    })


    
})