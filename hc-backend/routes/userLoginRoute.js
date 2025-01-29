const express = require('express');
const router = express.Router();
const validateAuth = require('../middlewares/validateAuth');

router.post('/login', validateAuth, (req, res) => {
    const data =  req.body
    delete data.password
    res.status(200).json({"data" : { message: 'User Login successfully', user: req.body}});
});

module.exports = router;
