const validateUserDetails = require('./validateUserDetails');

describe('validateUserDetails', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                firstname: 'John',
                lastname: 'Doe',
                email: 'john.doe@example.com',
                username: 'johndoe',
                address: '123 Main St',
                phone: '1234567890',
                password: 'Password1!',
                gender: 'male',
                dob: '01/01/2000'
            },
            app: {
                locals: {
                    appData: {
                        registeredUsers: []
                    }
                }
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    test('should call next if all validations pass', () => {
        validateUserDetails(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    test('should return 400 if user already exists', () => {
        req.app.locals.appData.registeredUsers.push({ email: 'john.doe@example.com', phone: '1234567890' });
        validateUserDetails(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'User already exists with the same email or phone number' });
    });

    test('should return 400 if any required field is missing', () => {
        delete req.body.firstname;
        validateUserDetails(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Missing fields: firstname' });
    });

    test('should return 400 if email format is invalid', () => {
        req.body.email = 'invalid-email';
        validateUserDetails(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email format' });
    });

    test('should return 400 if phone number format is invalid', () => {
        req.body.phone = 'invalid-phone';
        validateUserDetails(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid phone number format' });
    });

    test('should return 400 if password format is invalid', () => {
        req.body.password = 'password';
        validateUserDetails(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Password must be at least 6 characters long, include one uppercase letter, and one special character' });
    });

    test('should return 400 if date of birth format is invalid', () => {
        req.body.dob = 'invalid-dob';
        validateUserDetails(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid date of birth format' });
    });
});