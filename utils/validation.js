const validator = require('validator');

const validateSignUpData = (req)=>{
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName) throw new Error('name is not valid!')
    else if(firstName.length < 4) throw new Error('first name should be 4 to 50 characters')
    else if(!validator.isEmail(emailId)) throw new Error('Email is not valid') 
    else if(!validator.isStrongPassword(password)) throw new Error('Please enter a strong password')
}

module.exports = {validateSignUpData}