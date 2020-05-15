const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator: function (link) {
                return /(http:|https:)(\/\/)?((((?!www\.www\.)[a-z]+[\^W-w]+[.a-z])+([.a-z]{2,}))|((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){1,}(25[0-5]|2[0-4]\d|[01]?\d\d?))([:](6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|6[0-4][0-9]{3}|[1-5][0-9]{4}|[1-9][0-9]{0,3}))?([\/][!#%=&(*)%a-z-_0-9\.]+)*/.test(link);
            },
            message: props => `${props.value} is not valid link!`
        },
    },
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    likes: {
        type:[{ type: mongoose.Schema.Types.ObjectId }],
        default: []
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('card', cardSchema);
