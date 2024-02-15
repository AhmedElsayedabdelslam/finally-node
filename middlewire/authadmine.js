const jwt = require("jsonwebtoken");
const User = require("../Models/user");
require('dotenv').config();

const authadmine = async (req, res, next) => {
    const token = req?.cookies["acsses-token"];
    // console.log(token + "this is exist token");

    if (!token) {
        return res.status(401).send("Token is required");
    }


    let secretKey = process.env.ACCESS_TOKEN_SECRET;
    let decode = jwt.verify(token, secretKey);

    const user = await User.findOne({ _id: decode._id, tokens: token })
    // console.log(user.password)
    if (user.email == 'admine@gmail.com' && user.password == '$2a$10$iRIrEk.YPze4EODdWTjAwued0dgZhgqmfBs0JJ9ZfL5ypN0LPgALu') {

        req.user = user
        req.token = token
        next()
    } else {
        res.status(400).json('For Admine only');
    }


    //    catch(e){
    //   res.status(401).send({error:'Please authenticate'})
    // }

};

module.exports = authadmine;