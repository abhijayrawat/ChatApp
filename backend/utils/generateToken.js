import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    
    res.cookie('jwt', token, {
        httpOnly: true, // prevent xss attack cross site scripting
        maxAge: 30 * 24 * 60 * 60 * 1000, // MS
        sameSite:"strict",//CSRF attack cross site request forgery attacks 
        secure: process.env.NODE_ENV === 'production' ? true : false,
    });
    };
    
    export default generateTokenAndSetCookie;