const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const userData =  req.body
    const { registeredUsers } = req.app.locals.appData
    const userProfile = registeredUsers.find(user =>  user.email === userData.email);
    res.status(200).json({"message":"Profile", user: userProfile});
});

module.exports = router;
