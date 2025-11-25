const mongoose = require("mongoose");

const AcademySchema = new mongoose.Schema({
    name:    { type: String, required: true },
    address: { type: String, required: true }
});

module.exports = mongoose.model("Academy", AcademySchema);
