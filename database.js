const mongoose = require('mongoose');

mongoose.connect( 'mongodb://localhost/guia', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
} )
    .then(console.log('DB is connected =D'))
    .catch( err => console.err('ERROR => '+err) );

