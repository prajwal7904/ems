// import express
const express=require('express')

// create router for express
const router =new express.Router()
// import controller
const userController = require('../Controller/userController')

// import multer upload
const upload = require('../multerConfig/storageConfig')

// define route for each http request
router.post('/employee/register',upload.single('user_profile'),userController.register)

// define route for get all users
router.get('/employee/get-all-employee-details',userController.getusers)
// define getauser
router.get('/profile/getauser',userController.getauser)
// define deleteuser
router.delete('/employee/delete-user/:id',userController.deleteUser)
// define route to update user
router.put('/employee/update/:id',upload.single('user_profile'),userController.editUser)
// export router
module.exports = router

