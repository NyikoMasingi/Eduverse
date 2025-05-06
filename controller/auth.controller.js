const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const db = require('../config');
const {createProfile} = require('./profile.controller')



const createAccount = async(req, res) =>{
    try{
        let {username, password, auth_type} = req.body;

        password = await bcrypt.hash(password, 10)
        
        await db.execute(
            'INSERT into auth(username, password, auth_type) values(?,?,?)',
            [username, password, auth_type]
        ).then((response)=>{
            createProfile(response[0].insertId);
            return res.status(200).json({results : {username, auth_type}})
        })


    }catch(error){
        return res.status(500).json({message : error.message});
    }
    
}

const loginMobile = async(req, res) =>{
    try{
        const {username, password} = req.body;
        const [result] = await db.execute(
            'SELECT auth_id, username, password from auth WHERE username = ?',
            [username]
        )
        var token = jwt.sign(
            {
            
            },
            process.env.JWT_TOKEN,
            {
                algorithm : 'HS256',
            }
        )
        if(result.length > 0){
            
            const password_check = await bcrypt.compare(password, result[0].password)
            if(password_check){
                
                return res.status(200).json({auth_id : result[0].auth_id, token})
            }
            return res.status(401).json({message : "Invalid Credentials"})
        }else{
            return res.status(204)
        }
        

    }catch(error){
        return res.status(500).json({message : error.message})
    }
}


const updatePassword = async(req, res)=>{
    const {oldPassword, newPassword, profile_id} = req.body;
    var valid = await verifyPassword(profile_id, oldPassword);

    if(valid === true){
        const hashed = await bcrypt.hash(newPassword, 10)
        await db.execute(
            "update auth a " + 
            "join profile p on p.auth_id = a.auth_id " + 
            'set a.password = ? ' +
            "where p.profile_id = ?",
            [hashed, profile_id]
        ).then(()=>{
            return res.status(200).json({results : "successfully updated password"})
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message : error.message})
        });
    }else{
        return res.status(401).json({message : "Incorrect Password was provided"})
    }
}

const updateProfile = async(req, res)=>{
    const {first_name, last_name, profile_id, password} = req.body;
    var valid = await verifyPassword(profile_id, password);

    if(valid === true){
        await db.execute(
            'Update profile SET first_name = ?, last_name = ? WHERE profile_id = ?',
            [first_name, last_name, profile_id]
        ).then(()=>{
            return res.status(200).json({results : "Successfully updated"});
        }).catch((e)=>{
            return res.status(500).json({message : e.message});
        })
    }else{
        return res.status(401).json({message : "Incorrect Password was provided"})
    }
    
}

const deleteAccount = async(req, res)=>{
    const {password, profile_id} = req.body;

    var valid = await verifyPassword(profile_id, password);

    if(valid === true){
        
    }else{
        return res.status(401).json({message : "Incorrect Password"})
    }

}



const verifyPassword = async(profile_id, password)=>{
    const response = await db.execute(
        "SELECT a.password from auth a " +
        "JOIN profile p on a.auth_id = p.auth_id " +
        "where p.profile_id = ?",
        [profile_id]
    )
    if(response[0].length > 0){
        const hashed = response[0][0].password;

        const valid =  await bcrypt.compare(password, hashed);

    
        return valid;
    }
    else return false;
    
}






module.exports = {
    createAccount,
    loginMobile,
    updatePassword,
    updateProfile
}