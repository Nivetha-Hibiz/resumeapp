const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    useMongoClient: true
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');