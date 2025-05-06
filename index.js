require("dotenv").config();
const express = require('express')
const app = express()
const cors = require("cors")
const StudentRoutes = require("./routes/student.routes")
const AuthRoutes = require("./routes/auth.routes")
const ProfileRoutes = require("./routes/profile.routes")
const TopicRoutes = require("./routes/topic.routes")
const ForumRoutes = require("./routes/forum.routes")
const ForumChatsRoutes = require("./routes/forum_chat.routes")
const CourseRoutes = require("./routes/course.routes")
const MaterialRoutes = require("./routes/material.routes")
const VideoRoutes = require("./routes/video.routes")
const VideoCommentRoutes = require("./routes/video_comment.routes")
const TopicContentCommentRoutes = require("./routes/topic_content.routes")
 

app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(express.json())



app.listen(3001, '0.0.0.0',()=>{
    console.log("running on port 3001");
});

app.use(process.env.BASE_URL + '/auth', AuthRoutes)
app.use(process.env.BASE_URL + '/profile', ProfileRoutes)
app.use(process.env.BASE_URL + '/student', StudentRoutes)
app.use(process.env.BASE_URL + '/topic', TopicRoutes)
app.use(process.env.BASE_URL + '/forum', ForumRoutes)
app.use(process.env.BASE_URL + '/forum_chat', ForumChatsRoutes)
app.use(process.env.BASE_URL + '/course', CourseRoutes)
app.use(process.env.BASE_URL + '/video', VideoRoutes)
app.use(process.env.BASE_URL + '/material', MaterialRoutes)
app.use(process.env.BASE_URL + '/comment', VideoCommentRoutes)
app.use(process.env.BASE_URL + '/topic_content', TopicContentCommentRoutes)









