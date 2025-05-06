const db = require('../config');
const multer = require('multer');
const s3 = require('../aws.config')
require("dotenv").config();
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const getAllVideoInfo = async(req, res)=>{

    try{
        const {course_id} = req.params;
        await db.execute(
            "SELECT video_id, title, video_key, course_id FROM video " + 
            "WHERE course_id = ?",
            [course_id]
        ).then((response)=>{
            return res.status(200).json({results : response[0]});
        })
    }catch(error){
        return res.status(500).json({message : error.message });
    }

}

const uploadVideo = async(req, res)=>{
    upload.single('video')(req,res,async function(err){
        const {module} = req.body;

        if (err) {
            console.log("error : " + err)
            return res.status(500).json({ message: 'File upload error', error: err.message });
        }
        
        const video = req.file;
        const fileKey = `${module}/${Date.now()}^${video.originalname}`
        const params = {
            Bucket : process.env.AWS_VIDEO_BUCKET,
            Key : fileKey,
            Body : video.buffer,
            ContentType: req.file.mimetype,
        }

        try{
            await s3.send(new PutObjectCommand(params));

            //const videoUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
            
            await db.execute(
                'INSERT INTO video(title, course_id, video_key) VALUES(?,?,?)',
                [video.originalname, parseInt(module), fileKey]
            ).then(()=>{
                return res.status(200).json({results : "Successfully submitted"})
            })
        }catch (error) {
            console.error('Error uploading video:', error);
            res.status(500).send('Error uploading video');
        }
    })
}


const retrieveVideo = async(req, res)=>{
    const { video_key, course_id } = req.params;

    try{
        const command = new GetObjectCommand({
            Bucket : process.env.AWS_VIDEO_BUCKET,
            Key : `${course_id}/${video_key}`
        })
    
        const signedUrl = await getSignedUrl(s3, command,{expiresIn : 3600})

    
        return res.status(200).json({
            signedUrl
        })
    }catch(e){
        console.log(`error : ${e.message}`)
        return res.status(500).json({message : e.message})
    }
}






module.exports = {
    getAllVideoInfo, retrieveVideo,uploadVideo
}