import jwt from 'jsonwebtoken';

const default_user = {
id:1,
email : "gcrod.64@gmail.com",
password : "Pipo_2030",
};

export const login = (req,res) =>{
    const { email, password} = req.body;
    console.log(req.body);
    const user = {id: 1, email};

    if (email == default_user.email && default_user.password){
        const payload = {email};
        const expiration = {expiresIn :"1h"};
        const token = jwt.sign(payload,process.env.JWT_SECRET,expiration);
        return res.json({token}
            
        );
    }else{
        return res.sendStatus(401);
    }
    res.json({"message":"ok"});
};

