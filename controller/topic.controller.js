const db = require('../config');


const getAllTopics = async(req, res)=>{
    const {course_id} = req.params;
    const [result] = await db.execute(
        'SELECT t.topic_id, t.topic_title,t.is_open,t.profile_id,t.created, p.first_name, p.last_name from topic t ' +
        'JOIN profile p ON p.profile_id = t.profile_id' +
        ' where course_id = ?', 
        [course_id]
    );

    return res.status(200).json({results : result})
}

const createNewTopic = async(req, res)=>{
    const {profile_id,course_id, title} = req.body;
    
    await db.execute(
        "INSERT into topic(topic_title, course_id, profile_id) VALUES(?,?,?)",
        [title, parseInt(course_id), parseInt(profile_id)]
    ).then(()=>{
        return res.status(200).json({results : "Successfully created"})
    }).catch((e)=>{
        return res.status(500).json({message : e.message})
    })

}


// Topic Favs

const addToFavourite = async(req, res)=>{
    const {profile_id, topic_id} = req.body;
    await db.execute(
        "INSERT INTO profile_topic_favourite(profile_id, topic_id) VALUES(?,?)",
        [profile_id, topic_id]
    ).then(()=>{
        return res.status(200).json({})
    }).catch((error)=>{
        console.log(error)
        return res.status(500).json({})
    })
}

const removeFromFavourite = async(req, res)=>{
    const {profile_id, topic_id} = req.body;

    await db.execute(
        "DELETE FROM profile_topic_favourite WHERE profile_id = ? AND topic_id = ?",
        [profile_id, topic_id]
    ).then(()=>{
        return res.status(200).json({})
    }).catch(()=>{
        return res.status(500).json({})
    })
}


// Find the last message of a topic and compare it to the last message of the user for the topic

const getProfileTopics = async(req, res)=>{
    try{
        const {profile_id} = req.params;


        const myForums = await db.execute(
            "SELECT t.topic_id,t.topic_title, t.is_open, t.created,t.profile_id, c.name AS module_title, p.first_name, p.last_name from topic t " + 
            "JOIN course c ON c.module_id = t.course_id " +
            "JOIN profile p ON p.profile_id = t.profile_id " +
            "where t.profile_id = ?",
            [profile_id]
        )
        
        const forumsFollowing = await db.execute(
            'SELECT f.topic_id,t.topic_title, t.is_open, t.created,t.profile_id, c.name AS module_title, p.first_name, p.last_name from profile_topic_favourite f ' + 
            'JOIN topic t ON t.topic_id = f.topic_id ' + 
            'JOIN course c ON c.module_id = t.course_id ' + 
            "JOIN profile p ON p.profile_id = t.profile_id " +
            'WHERE f.profile_id = ?',
            [profile_id]
        )
        

        return res.json({my_forums : myForums[0], forums_following : forumsFollowing[0]})
    }catch(error){
        return res.status(500).json({message : error.message})
    }
}


const deleteTopic = (req, res)=>{
    
}

module.exports = {
    getAllTopics,
    createNewTopic,
    addToFavourite,
    removeFromFavourite,
    getProfileTopics,
    deleteTopic
}