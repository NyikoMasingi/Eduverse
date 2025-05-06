const db = require('../config')


const getAllCourses = async(req, res)=>{
    await db.execute(
        'SELECT * from course WHERE course_id > 0'
    ).then((response) =>{
        return res.status(200).json({results : response[0]})
    }).catch((error) =>{
        console.log(res.status(500).json({message : error.message}));
        return res.status(500).json({message : error.message});

    });   
}




module.exports = {
    getAllCourses
}
