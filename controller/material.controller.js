const db = require("../config");
const multer = require("multer")



const storage = multer.memoryStorage();
const upload = multer({storage : storage})


const uploadMaterial = async(req, res)=>{

    upload.single('material')(req, res, async function(err){
        const {title, module} = req.body;


        if(err){
            return res.status(500).json({ message: 'File upload error', error: err.message });
        }

        const materialFile = req.file.buffer
        
        await db.execute(
            'INSERT INTO material(title, course_id, file) values(?,?,?)',
            [title, module, materialFile]
        ).then(()=>{
            return res.status(200).json({results : "Submitted successfully"});
        }).catch((error) =>{
            return res.status(500).json({ message : error.message })
        })


    })

}





module.exports = {
    uploadMaterial
}






