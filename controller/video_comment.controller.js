const db = require('../config')



const createComment = async (req, res) => {
    const { content, video_id, profile_id, parent_id } = req.body;
    console.log(req.body);


    const finalParentId = parent_id === '' ? null : parent_id;

    await db.execute(
        'INSERT INTO video_comment (content, video_id, profile_id, parent_id) VALUES (?, ?, ?, ?)',
        [content, parseInt(video_id), parseInt(profile_id), finalParentId]
    ).then(() => {
        return res.status(200).json({ results: "Successfully created" });
    }).catch((e) => {
        console.log(e.message);
        return res.status(500).json({ message: e.message });
    });
}


const getVideoComments = async(req,res)=>{
    const {id} = req.params;

    await db.execute(
        'SELECT c.comment_id, c.content, c.time, p.first_name, p.last_name from video_comment c ' +
        'JOIN profile p on c.profile_id = p.profile_id ' + 
        'WHERE c.video_id = ? ' + 
        'ORDER BY c.time DESC ',
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