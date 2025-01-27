const userFields = ['firstname', 'lastname', 'email', 'username', 'address', 'phone', 'password', 'gender', 'dob'];

const validateUserDetails = (req, res, next) => {
    const userData = req.body
    const { registeredUsers } = req.app.locals.appData

    // Check if user already exists
    const userExists = registeredUsers.some(user => user.email === userData.email || user.phone === userData.phone);
    if (userExists) {
        return res.status(400).json({ error: 'User already exists with the same email or phone number' });
    }

    const missingFields = userFields.reduce((acc, field) => {
        if (!userData[field]) {
            acc.push(field);
        }
        return acc;
    }, []);

    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate phone number format (example: 10-15 digits)
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(userData.phone)) {
        return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Validate password (minimum 6 characters, at least one uppercase letter, and one special character)
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(userData.password)) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long, include one uppercase letter, and one special character' });
    }

    // Validate date of birth format (example: MM/DD/YYYY)
    const dobRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!dobRegex.test(userData.dob)) {
        return res.status(400).json({ error: 'Invalid date of birth format' });
    }
    registeredUsers.push(userData)
    next();
};

module.exports = validateUserDetails;