const CommunityMember = require('../models/CommunityMember');

// @desc    Get all community members
// @route   GET /api/members
// @access  Public
exports.getMembers = async (req, res) => {
    try {
        const members = await CommunityMember.find().sort({ createdAt: -1 });
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new community member
// @route   POST /api/members
// @access  Public
exports.createMember = async (req, res) => {
    try {
        const member = await CommunityMember.create(req.body);
        res.status(201).json(member);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get single community member
// @route   GET /api/members/:id
// @access  Public
exports.getMember = async (req, res) => {
    try {
        const member = await CommunityMember.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update community member
// @route   PUT /api/members/:id
// @access  Public
exports.updateMember = async (req, res) => {
    try {
        const member = await CommunityMember.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        res.status(200).json(member);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete community member
// @route   DELETE /api/members/:id
// @access  Public
exports.deleteMember = async (req, res) => {
    try {
        const member = await CommunityMember.findByIdAndDelete(req.params.id);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        res.status(200).json({ message: 'Member deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 