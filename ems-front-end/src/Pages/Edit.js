import React, { useState, useEffect } from 'react'
import { Alert, Button, Card, Row } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import Select from 'react-select';
import LoadingSpinner from '../Components/LoadingSpinner';
import { ToastContainer, toast } from 'react-toastify';
import { empRegister, getauser, updateUser } from '../services/allApis';
import { useNavigate, useParams } from 'react-router-dom';
import { registerContext } from '../Components/ContextShare';
import { BASE_URL } from '../services/base_url';



function Edit() {

  // state to hold existing image
  const [existingImg,setexistingImg]=useState("")

  // get paramater
  const {id}= useParams()
  // console.log(id);
  
  const getProfile= async()=>{
    // call getauser of service
    const {data}=await getauser(id)
    setuserdata(data);
    setstatus(data.status)
    setexistingImg(data.profile)
    
    
  }
   
    
  
    // error msg
   const [errorMsg, setErrorMsg] = useState("");

    // use navigate
    const navigate=useNavigate()
    const [showspin, setSpin] = useState(true)
  
    // status dropdown
    const options = [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' }
    ];
  
    const [userdata, setuserdata] = useState({
      fname: "",
      lname: "",
      email: "",
      mobile: "",
      gender: "",
      location: ""
    })
    // create state fr status
    const [status, setstatus] = useState("Active")
  
    // create state to hold image
    const [image, setimage] = useState("")
  
    // create state to hold profile picture
    const [preview, setpreview] = useState("")
  
  
  
    // to update userdata when user enter the input using html
    const userDetail = (e) => {
      const { name, value } = e.target
      setuserdata({ ...userdata, [name]: value })
    }
  
    const updateState = (e) => {
      setstatus(e.value)
    }
    const setprofile = (e) => {
      setimage(e.target.files[0])
    }
  
    // console.log(userdata);
    // console.log(status);
    // console.log(image)
  
  useEffect(()=>{
    getProfile()
  },[id])
  
  
    useEffect(() => {
  
      if (image) {
        setpreview(URL.createObjectURL(image))
      }
      setTimeout(() => {
        setSpin(false)
      }, 2000)
  
    }, [image])
  
    const handlesubmit = async(e) => {
      // prevent click event to stope reload 
      e.preventDefault()
      // get user input data from the form
      const { fname, lname, email, mobile, gender, location } = userdata
      if (fname === "") {
        toast.error("First Name required!!!")
      }
      else if (lname === "") {
        toast.error("Last name required")
      }
      else if (email === "") {
        toast.error("email required")
      }
      else if (mobile === "") {
        toast.error("mobile required")
      }
      else if (gender === "") {
        toast.error("gender required")
      }
      else if (image === "") {
        toast.error("image required")
      }
      else if (location === "") {
        toast.error("location required")
      }
      else {
        // make register api call
        // headerconfig
        const headerconfig = {
          "Content-Type": "multipart/form-data"
        }
        // body
        const data = new FormData();
        data.append("user_profile", image)
        data.append("fname", fname)
        data.append("lname", lname)
        data.append("email", email)
        data.append("mobile", mobile)
        data.append("gender", gender)
        data.append("status", status)
        data.append("location", location)
        try{
         // api call
         const response=await updateUser(id,data,headerconfig)
        if (response.status === 200) {
         
        
          // navigate
        navigate('/')
  
        }
        else{
          console.log(response.data);
        setErrorMsg("Error")
        }
      }
      catch (err) {
        console.error("API call error:", err);
        setErrorMsg(err?.response?.data?.message || "Failed to register employee.");
      }
    }
  };
    return (
      <>
      {
        errorMsg?<Alert variant='danger' className='bg-danger' onClose={()=>setErrorMsg("")} dismissible>{errorMsg}</Alert>:""
      }
        {
          showspin ? <LoadingSpinner /> :
            <div className='container mt-5'>
              <h2 className='text-center mt-3'>Update Employee Details</h2>
              <Card className='shadow mt-3 p-3'>
                <div className="text-center mb-3">
                  <img className='rounded-circle border  p-1' width={'100px'} height={'100px'} src={preview ? preview : `${BASE_URL}/uploads/${existingImg}`} alt="profile" />
                </div>
                <Form>
                  <Row>
                    <Form.Group className="col-lg-6 mb-2">
                      <Form.Label>First name</Form.Label>
                      <Form.Control name='fname' value={userdata.fname} required type="text" placeholder="First name" onChange={userDetail}
                      />
                    </Form.Group>
                    <Form.Group className="col-lg-6 mb-2">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control name='lname' value={userdata.lname} required type="text" placeholder="Last name" onChange={userDetail}
                      />
                    </Form.Group>
                    <Form.Group className="col-lg-6 mb-2">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control name='email' value={userdata.email} required type="text" placeholder="Email Address" onChange={userDetail}
                      />
                    </Form.Group>
                    <Form.Group className="col-lg-6 mb-2">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control name='mobile' value={userdata.mobile} required type="text" placeholder="Mobile" onChange={userDetail}
                      />
                    </Form.Group>
                    <Form.Group className="col-lg-6 mb-2">
                      <Form.Label>Gender</Form.Label>
                      <Form.Check required type={'radio'} label="Male" name="gender" value={'Male'} onChange={userDetail} checked={userdata.gender==="Male"?true:false}
                      />
                      <Form.Check required type={'radio'} label="Female" name="gender" value={'Female'} onChange={userDetail} checked={userdata.gender==="Female"?true:false}
                      />
                    </Form.Group>
                    <Form.Group className="col-lg-6 mb-2">
                      <Form.Label>Select Employee Status</Form.Label>
                      <Select className='text-dark' options={options} onChange={updateState} defaultInputValue={status} />
                    </Form.Group>
                    <Form.Group className="col-lg-6 mb-2">
                      <Form.Label>Choose Profile Picture</Form.Label>
                      <Form.Control name='user_profile' required type="file"  onChange={setprofile}
                      />
                    </Form.Group>
                    <Form.Group className="col-lg-6 mb-2">
                      <Form.Label>Enter Employee Location</Form.Label>
                      <Form.Control name='location' value={userdata.location} required type="text" placeholder="Enter Employee Location" onChange={userDetail}
                      />
                    </Form.Group>
                    <Button onClick={handlesubmit} className='btn btn-info mt-3'>Submit</Button>
                  </Row>
                </Form>
              </Card>
            </div>
        }
        <ToastContainer position='top-center' />
      </>
    )
}

export default Edit
