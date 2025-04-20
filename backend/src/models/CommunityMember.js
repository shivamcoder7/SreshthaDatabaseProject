const mongoose = require('mongoose');

const communityMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
        unique: true,
        trim: true
    },
    profession: {
        type: String,
        required: [true, 'Please add a profession'],
        trim: true
    },
    homeTown: {
        type: String,
        required: [true, 'Please add a home town'],
        trim: true
    },
    remarks: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CommunityMember', communityMemberSchema); 