const express = require('express');
const router = express.Router();
const validateUserDetails = require('../middlewares/validateUserDetails');

router.post('/register', validateUserDetails, (req, res) => {
    const data =  req.body
    delete data.password
    res.status(200).json({ message: 'User registered successfully', user: req.body});
});

module.exports = router;
