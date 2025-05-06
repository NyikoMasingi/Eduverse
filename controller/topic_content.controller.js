const db = require('../config')


const getAllContent = async(req, res)=>{
    const {topic_id, profile_id} = req.params;
    const isFollowing = await checkIfFollowingTopic(profile_id, topic_id);
    await db.execute(
        'SELECT t.content, t.date, p.first_name, p.last_name FROM topic_content t ' + 
        'JOIN profile p ON p.profile_id = t.profile_id ' + 
        'WHERE t.topic_id = ? ORDER BY t.date DESC',
        [parseInt(topic_id)]
    ).then((response) =>{
        return res.status(200).json({isFollowing : isFollowing ,results : response[0]});
    }).catch((e)=>{
        return res.status(500).json({message : e.message});
    })
}


const createTopicContent = async(req, res)=>{
    const {profile_id, topic_id, content} = req.body;
    await db.execute(
        'INSERT INTO topic_content(profile_id, topic_id, content) VALUES(?,?,?)',
        [parseInt(profile_id), parseInt(topic_id), content]
    ).then((r)=>{
        console.log(r)
        return res.status(200).json({results : "Successfully created"});
    }).catch((e)=>{
        console.log(e)
        return res.status(500).json({message : e.message});
    })
}



const checkIfFollowingTopic = async(profile_id, topic_id)=>{
    console.log(`profile id ${profile_id}` )
    console.log(`topic id ${topic_id}` )
    try{
        const res = await db.execute(
            "SELECT profile_topic_favourite_id from profile_topic_favourite WHERE profile_id = ? AND topic_id = ?",
            [profile_id, topic_id]
        )
        console.log(res[0])
        if(res[0].length > 0){
            console.log(res[0])
            return true;
        }else{
            return false;
        }
    }catch(error){
        return false;
    }
}


module.exports = {
    getAllContent,
    createTopicContent
}