const validateAuth = (req, res, next) => {
    const userData = req.body
    const { registeredUsers } = req.app.locals.appData
  
    // Check if user already exists
    const userExists = registeredUsers.some(user => user.email === userData.email || user.phone === userData.phone);
    if (!userExists) {
        return res.status(400).json({ message: 'User does not exists with this email' });
    }
    
    // // Check for password
    // const userPassword = registeredUsers.some(user =>  user.password === userData.password);
    // if (userPassword) {
    //     return res.status(200).json({ message: 'User exists with this password' });
    // }else{
    //     return res.status(400).json({ message: 'User does not exists with this email' });
    // }
    next();
};

module.exports = validateAuth;