//for a mongoose db, this is where you would put your model, 
//requiring a schema, mongoose, exporting it to use in your controller file
//you could also put your mongoURI and connect your server in this file

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task:{
        type: String,
        required: true
    }
})


module.exports = mongoose.model('TaskMode', taskSchema);ema)