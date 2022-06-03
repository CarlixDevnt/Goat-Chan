const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({
    id: { type: String },
    registeredAt: { type: Number, default: Date.now() },
    xp: { type: String, default: 0 },
    banned: { type: Boolean, default: false },

    profile: { type: Object, default: {
        name: null,
        bio: null,
        birthday: null,
        color: null,
        favPokemon: null,
    }},

    ranks: { type: Object, default: {
        partner: false,
        vip: false,
        dev: false,
    }},

    filters: { type: Object, default: {
        letters: false,
        nsfw: false,
    }},

}));

