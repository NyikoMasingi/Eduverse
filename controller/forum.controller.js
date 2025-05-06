const db = require('../config')



const getAllForums = async (req, res) => {
    await db.execute(
        'SELECT f.forum_id, f.title, f.profile_id, f.course_id, f.created, ' +
        'p.first_name, p.last_name, c.title AS course_title, ' +
        'COUNT(fc.forum_chat_id) AS chat_count ' +
        'FROM forum f ' +
        'JOIN profile p ON p.profile_id = f.profile_id ' +
        'JOIN course c ON c.course_id = f.course_id ' +
        'LEFT JOIN forum_chat fc ON fc.forum_id = f.forum_id ' +
        'WHERE f.is_open = 1 ' +
        'GROUP BY f.forum_id, f.title, f.profile_id, f.course_id, f.created, p.first_name, p.last_name, c.title ' +
        'ORDER BY f.created DESC'
    ).then((response) => {
        return res.status(200).json({ results: response[0] });
    }).catch((error) => {
        console.error(error);
        return res.status(500).json({ message: error.message });
    });
}

const createNewForum = async (req, res) => {
    const { profile_id, module_id, title } = req.body;

    try {
        const [insertResult] = await db.execute(
            'INSERT INTO forum (profile_id, course_id, title) VALUES (?, ?, ?)',
            [profile_id, module_id, title]
        );

        const insertedId = insertResult.insertId;
        console.log(`Inserted ID: ${insertedId}`);

        const [newForumRows] = await db.execute(
            'SELECT f.forum_id, f.title, f.profile_id, f.course_id, f.created, ' +
            'p.first_name, p.last_name, c.title AS course_title, ' +
            '(SELECT COUNT(*) FROM forum_chat fc WHERE fc.forum_id = f.forum_id) AS chat_count ' +
            'FROM forum f ' +
            'JOIN profile p ON p.profile_id = f.profile_id ' +
            'JOIN course c ON c.course_id = f.course_id ' +
            'WHERE f.forum_id = ?',
            [insertedId]
        );

        return res.status(201).json({ results: newForumRows[0] });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}




module.exports = {
    getAllForums,
    createNewForum
}