const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    url: { type: String, required: true }
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;