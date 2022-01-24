const express = require('express');
const {check, body} = require('express-validator/check')

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', 
    [check('email') //this email we would extract that email from the cookies, the headers,body so anywhere 
        .isEmail()
        .withMessage('Please enter a valid email ')
        .custom((value, {req}) => {
            if(value === 'test@test.com') {
                throw new Error('This email address is forbidden')
            }
            return true
        }),
    body(
    'password', //will look up for password field in the body
    'Please enter a password with only numbers and text and at least 5 charachters') // error message, instead using withMessage method
    .isLength({min: 5})
    .isAlphanumeric(),// without special charachters

    body('confirmPassword').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Passwords have to match!')
        }
        return true
    })
    ],
        authController.postSignup);//email is a name if input field that we want to check
//validaton result will be avalable in the auth-controller by exporting there 

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;