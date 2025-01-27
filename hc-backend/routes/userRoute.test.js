const request = require('supertest');
const express = require('express');
const validateUserDetails = require('../middlewares/validateUserDetails');
const router = require('./userRoute');

const app = express();
app.use(express.json());
app.use('/user', router);

describe('POST /user/register', () => {
    let registeredUsers;

    beforeEach(() => {
        registeredUsers = [];
        app.locals.appData = { registeredUsers };
    });

    test('should register a user successfully', async () => {
        const userData = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            username: 'johndoe',
            address: '123 Main St',
            phone: '1234567890',
            password: 'Password1!',
            gender: 'male',
            dob: '01/01/2000'
        };

        const response = await request(app)
            .post('/user/register')
            .send(userData);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'User registered successfully',
            user: {
                firstname: 'John',
                lastname: 'Doe',
                email: 'john.doe@example.com',
                username: 'johndoe',
                address: '123 Main St',
                phone: '1234567890',
                gender: 'male',
                dob: '01/01/2000'
            }
        });
        expect(registeredUsers).toHaveLength(1);
    });

    test('should return 400 if user already exists', async () => {
        registeredUsers.push({ email: 'john.doe@example.com', phone: '1234567890' });

        const userData = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            username: 'johndoe',
            address: '123 Main St',
            phone: '1234567890',
            password: 'Password1!',
            gender: 'male',
            dob: '01/01/2000'
        };

        const response = await request(app)
            .post('/user/register')
            .send(userData);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'User already exists with the same email or phone number' });
    });

    test('should return 400 if any required field is missing', async () => {
        const userData = {
            lastname: 'Doe',
            email: 'john.doe@example.com',
            username: 'johndoe',
            address: '123 Main St',
            phone: '1234567890',
            password: 'Password1!',
            gender: 'male',
            dob: '01/01/2000'
        };

        const response = await request(app)
            .post('/user/register')
            .send(userData);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Missing fields: firstname' });
    });

    // Additional tests for invalid email, phone, password, and dob formats can be added similarly
});