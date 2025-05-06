const nodemailer = require("nodemailer")
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host : process.env.EMAIL_HOST,
    port : process.env.EMAIL_PORT,
    secure : true,
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS,
    }
})








const send_email = async(req, res)=>{
    try{
        const {name, email, subject, message} = req.body;

        await transporter.sendMail({
            from : process.env.EMAIL_SOURCE,
            to : process.env.EMAIL_DESTINATION,
            subject : `website-${subject}`,
            html : `<h5>Name : ${name}</h5>` + 
            `<h5>Email : ${email}</h5>` + 
            `<p>${message} </p>`
        }).then(()=>{
            return res.status(200).json({success : true}) 
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({success : false, error})
    }
}




module.exports = send_email;