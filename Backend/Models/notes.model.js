import mongoose from "mongoose";

const notesSchema = mongoose.Schema({

    title: {
        type: String,
        required: [true, "Please fill your title"]
    },

    content: {
        type: String,
        required: [true, "Please fill content "]
    },
}, { timestamps: true });

const Notes = mongoose.model("Notes", notesSchema);
export default Notes;