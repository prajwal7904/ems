const multer = require('multer')
const path = require('path')

// using multer define storage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'))
    },
    filename: (req, file, callback) => {
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null, filename)
    }
})

// filtering uploading file
const fileFilter = (req, file, callback) => {
    
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true)
    } else {
        callback(null, false)
        return callback(new Error("Only .png , .jpeg , .png files are allowed!"))
    }
}

// define upload
const upload = multer({
    storage,
    fileFilter
})

// export upload
module.exports = upload
