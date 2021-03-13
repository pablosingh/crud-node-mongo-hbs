const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema( {
    name: { type: String},
    tel: { type: String}
} );

module.exports = mongoose.model('user', userSchema);











// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const NoteSchema = new Schema( {
//     title: { type: String, required: true },
//     description: { type: String, required: true},
//     date: { type: Date, default: Date.now }
// } );

// module.exports = mongoose.model('Note', NoteSchema);
