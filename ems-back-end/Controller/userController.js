// import model
const users = require('../model/userSchema')

// define logic to resolve client request

// register
exports.register = async(req,res)=>{
  console.log(req.file);
  const file=req.file.filename
  const{fname,lname,email,mobile,gender,status,location}=req.body
  if(!fname||!lname||!email||!mobile||!gender||!status||!location||!file){
    res.status(403).json("all inputs are required")
  }
  try{
        //   check existing employee
   const preuser=await users.findOne({email})
   if(preuser){
   return res.status(406).json("user already exits!!!")
   }
   else{
    const newuser = new users({
        fname,lname,email,mobile,gender,status,profile:file,location
    })
    // db save
    await newuser.save()
    res.status(200).json(newuser)
   }
    
  }
  catch(error){
    res.status(401).json(error)
  }

}
// getusers
exports.getusers = async(req,res)=>{
  const search =req.query.search
  const query = {
    fname:{$regex:search,$options :"i"}
  }
  try{
    console.log(query)
    const allusers = await users.find(query)
    res.status(200).json(allusers)

  }
  catch(error){
    res.status(401).json(error)
  }
}
exports.getauser = async(req,res)=>{
  try{
    const id = req.query.id
    console.log(id);
    
    const userdetail = await users.findOne({_id:id})
    res.status(200).json(userdetail)
    

  }
  catch(error){
    res.status(401).json(error)
  }
}


exports.deleteUser = async(req,res)=>{

  const {id}=req.params
  // console.log(id)
  try{
    
    const removeitem = await users.findByIdAndDelete({_id:id})
    res.status(200).json(removeitem)
    

  }
  catch(error){
    res.status(401).json(error)
  }
}
exports.editUser=async(req,res)=>{
  // get values from req
  const {id}=req.params
  const{fname,lname,email,mobile,gender,status,location,user_profile}=req.body
  const file = req.file?req.file.filename:user_profile
  try{
    const updateuser=await users.findByIdAndUpdate({_id:id},{fname,lname,email,mobile,gender,status,profile:file,location},{new:true})
    await updateuser.save()
    res.status(200).json(updateuser);
  }
  catch(error){
    console.log(error)
    res.status(401).json(error)
  }
}