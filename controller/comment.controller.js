const db = require('../config')



const createComment = async(req,res)=>{
    const {content, video_id, profile_id} = req.body;
    console.log(`Video ID : ${video_id}`)
    await db.execute(
        'INSERT into comment(content, video_id, profile_id) VALUES (?,?,?)',
        [content, parseInt(video_id), parseInt(profile_id)]
    ).then(()=>{
        return res.status(200).json({results : "Successfully created"})
    }).catch((e)=>{
        console.log(e.message)
        return res.status(500).json({message : e.message})
    });
}

const getVideoComments = async(req,res)=>{
    const {id} = req.params;

    await db.execute(
        'SELECT c.content, c.time, p.first_name, p.last_name from comment c ' +
        'JOIN profile p on c.profile_id = p.profile_id ' + 
        'WHERE c.video_id = ?',
        [id]
    ).then((response)=>{
        return res.status(200).json({results : response[0]})
    }).catch((e) =>{
        return res.status(500).json({message : e.message})
    })
}






module.exports = {
    createComment,
    getVideoComments
}