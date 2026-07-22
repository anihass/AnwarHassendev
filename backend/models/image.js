const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    Url: {
        type: String,
        required: true
    },
    publicId: {   // <-- needed for Cloudinary deletion
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    uploadedBy: {   // <-- needed for authorization check
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
