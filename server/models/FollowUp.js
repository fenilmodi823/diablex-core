const JsonDB = require('../lib/db');

// Create a "FollowUp" model backed by the 'followups' collection in db.json
const FollowUp = JsonDB.createModel('followups');

module.exports = FollowUp;
