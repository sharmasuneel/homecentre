const express = require('express');
const router = express.Router();
const { validateUser } = require('../utils/auth')

router.post('/', async (req, res, next) => {
    const payload =  req.body
    // appData.users.push(payload)
    //TODO: validate the registration form
    const validate =  validateUser(payload)
    return res.json({user: payload, message: 'User regirtered successfully'});
});

module.exports = router;
