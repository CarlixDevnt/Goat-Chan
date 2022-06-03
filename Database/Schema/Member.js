const mongoose = require("mongoose");

module.exports = mongoose.model("Member", new mongoose.Schema({
    id: { type: String }, 
    guild: { type: String }, 
    registeredAt: { type: Number, default: Date.now() },
    
    muted: { type: Object, default: {
        isMuted: false,
        muteTime: 0,
        reason: null
    }},

    warnings: { type: Array },
}));