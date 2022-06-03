const mongoose = require("mongoose"),
config = require("./../../config.json");

module.exports = mongoose.model("Guild", new mongoose.Schema({

    id: { type: String }, 
    registeredAt: { type: Number, default: Date.now() },
    prefix: { type: String, default: config.prefix },
    partner: { type: Boolean, default: false },

    channels: { type: Object, default: { 
        welcome: {
            enabled: false, 
            channel:  null, 
            message: null, 
            image: false, 
            embed: false 
        },
        goodbye: {
            enabled: false, 
            channel:  null, 
            message: null, 
            image: false, 
            embed: false 
        },
        suggestions: {
            enabled : false,
            channel: null,
            emojis: {
                up: "🔼",
                down: "🔽",
            },
        },
        confessions: {
            enabled : false,
            channel: null,
            reactions: true,
        },
    }},

    plugins: { type: Object, default: { 
        autorole: {
            enabled: false,
            role: null,
        },
        leveling: {
            enabled: false,
            sendMessage: true,
            levelMsgChannel: null,
            customMessage: null,
        }
    }},
}));