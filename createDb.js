const { User } = require('./models');
const mongoose = require("./lib/mongoose");
const async = require("async");


async.series([
    open,
    dropDatabase,
    createUsers,
    close
], function (err, data) {
    console.log(arguments);
});

function open(cb) {
    mongoose.connection.on('open', cb);
}

function dropDatabase(cb) {
    let db = mongoose.connection.db;
    db.dropDatabase(cb);
}

function createUsers(callback) {
    let users = [
        { username: "Bogdan", password: "123123" },
        { username: "Artem", password: "321321" },
        { username: "Admin", password: "125125" }
    ];

    async.each(users, function (userData, callback) {
        let user = new User(userData);
        user.save(callback);
    }, callback);

    // async.parallel([
    //     function (callback) {
    //         let bogdan = new User({ username: "Bogdan", password: "123123" });
    //         bogdan.save((err) => {
    //             callback(err, bogdan)
    //         });
    //     },
    //     function (callback) {
    //         let artem = new User({ username: "Artem", password: "321321" });
    //         artem.save((err) => {
    //             callback(err, artem)
    //         });
    //
    //     },
    //     function (callback) {
    //         let admin = new User({ username: "Admin", password: "125125" });
    //         admin.save((err) => {
    //             callback(err, admin)
    //
    //         });
    //     },
    // ], cb);
}

function close(cb) {
    mongoose.disconnect(cb);
}

//
// //
// mongoose.connection.on('open', (err, data) => {
//     if (err) throw err;
//     let db = mongoose.connection.db;
//     // let vova = new User({ username: "Vladimir", password: "123123" });
//     // vova.save((err) => {
//     //     if (err) throw err;
//
//     db.dropDatabase((err) => {
//         if (err) throw err;
//
//         async.parallel([
//             function (callback) {
//                 let bogdan = new User({ username: "Bogdan", password: "123123" });
//                 bogdan.save((err) => {
//                     callback(err, bogdan)
//                 });
//             },
//             function (callback) {
//                 let artem = new User({ username: "Artem", password: "321321" });
//                 artem.save((err) => {
//                     callback(err, artem)
//                 });
//
//             },
//             function (callback) {
//                 let admin = new User({ username: "Admin", password: "125125" });
//                 admin.save((err) => {
//                     callback(err, admin)
//
//                 });
//             },
//         ],);
//
//
//     });
//     // });
// });


// // create a user a new user
// let testUser = new User({
//     username: 'jmar777',
//     password: 'Password123'
// });
//
// // save user to database
// testUser.save(function(err) {
//     if (err) throw err;
// });
//
// // fetch user and test password verification
// User.findOne({ username: 'jmar777' }, function(err, user) {
//     if (err) throw err;
//
//     // test a matching password
//     user.comparePassword('Password123', function(err, isMatch) {
//         if (err) throw err;
//         console.log('Password123:', isMatch); // -&gt; Password123: true
//     });
//
//     // test a failing password
//     user.comparePassword('123Password', function(err, isMatch) {
//         if (err) throw err;
//         console.log('123Password:', isMatch); // -&gt; 123Password: false
//     });
// });
