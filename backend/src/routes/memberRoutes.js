const express = require('express');
const router = express.Router();
const {
    getMembers,
    createMember,
    getMember,
    updateMember,
    deleteMember
} = require('../controllers/communityMemberController');

router.route('/')
    .get(getMembers)
    .post(createMember);

router.route('/:id')
    .get(getMember)
    .put(updateMember)
    .delete(deleteMember);

module.exports = router; 