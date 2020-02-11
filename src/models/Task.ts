/// như Model trong MVC

import mongoose, { SchemaType, model } from 'mongoose'
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    sdt: {
        type: String,
        required: true,
        validate:/(09|01|03[2|6|8|9])+([0-9]{7})\b/
    },
    description: {
        type: String
    }
});

export default  model('Task',TaskSchema);