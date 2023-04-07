const mongoose = require("mongoose");
const imagSchema = new mongoose.Schema({
    name : {
        required : true,
        type : String
        
    },
    image  : {
        type : String,
        required : true
    }  
});

const ImageModel = mongoose.model("Image",imagSchema);
module.exports = ImageModel;