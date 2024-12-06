const express = require('express');
const { deployProject } = require('../controller/deployController');

const router = express.Router();

router.post('/deploy',deployProject);

module.exports = router;