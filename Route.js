const product = require('./Model')
const express = require('express')
const multer = require('multer')
const cloudinary = require('cloudinary').v2


const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.filename + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage }).single('image')


  // upload to cloudinary

  cloudinary.config({
      cloud_name : 'giddy',
      api_key : '478564868449943',
      api_secret : '50RMyR-bHCqJu6lPYHdsWXsw_AQ'
  })
  


router.get('/', async(req, res)=>{
    try{
        const getProd = await product.find()
        res.status(200).json(getProd)
    }catch(err){
        res.status(404).json('an error occured while getting')
    }
})

router.post('/', upload, async(req, res) => {
    try{
        const myImage = await cloudinary.uploader.upload(req.file.path)

        console.log(myImage)
        const postData = await product.create({
            title : req.body.title,
            description : req.body.description,
            image : myImage.secure_url
        })

        res.status(201).json(postData)

    }catch(err){
        res.status(404).json('an error occured while getting')
    }
})











module.exports = router