const mongoose = require('mongoose');

const File = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    files: []
}, {
    timestamps: true,
    toObject: {virtuals: true},//fala pra calcular propriedades virtuais como a url abaixo
    toJSON: {virtuals: true},
});

//campo q n ta no BD 
File.virtual('url').get(function() {
    const url = process.env.URL || 'http://localhost:3333';
    return `${url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model("File", File);