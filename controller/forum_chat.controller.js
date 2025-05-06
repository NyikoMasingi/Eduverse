const db = require('../config')





const getForumChats = async(req, res) =>{
    const {forum_id} = req.params;
    await db.execute(
        'SELECT fc.forum_chat_id,fc.content, fc.posted, p.first_name, p.last_name  from forum_chat fc ' +
        'JOIN profile p on p.profile_id = fc.profile_id ' +
        'WHERE forum_id = ? ' + 
        'ORDER BY fc.forum_chat_id DESC', 
        [forum_id]
    ).then((response)=>{
        return res.status(200).json({results : response[0]});
    }).catch((error)=>{
        return res.status(500).json({message : error.message})
    })

}

const createForumChat = async(req, res)=>{
    try{
        const {profile_id, forum_id, content} = req.body;
        console.log(req);
        await db.execute(
            'INSERT into forum_chat(profile_id, forum_id, content) VALUES(?,?,?)',
            [profile_id, forum_id, content]
        ).then(() =>{
            return res.status(201).json({results : 'success'})
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({message : error.message})
    }
}



module.exports = {
    getForumChats,
    createForumChat
}