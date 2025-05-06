const db = require('../config')




const getProfile = async(req, res)=>{
    const {id} = req.params;
    
    await db.execute(
        "SELECT profile_id, first_name , last_name from profile WHERE auth_id = ?",
        [id]
    ).then((response) =>{
        return res.status(200).json({results : response[0]});
    }).catch((error)=>{
        return res.status(200).json({message : error.message});
    })
    
}


const createProfile = async(auth_id)=>{
    await db.execute(
        'INSERT into profile(auth_id) VALUES(?)',
        [auth_id]
    )
}




module.exports = {
    getProfile,
    createProfile,
    
}