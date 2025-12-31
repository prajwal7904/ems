import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import HomeTable from '../Components/HomeTable'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../Components/LoadingSpinner'
import { deleteContext, registerContext } from '../Components/ContextShare';
import { getusers, removeUser} from "../services/allApis"


function Home() {

   const {deleteData,setdeleteData}=useContext(deleteContext)

  // cstate tohold search data
  const[searchKey,setsearchKey]=useState("")
  console.log(searchKey);

  // dlete user
 

  // define handleDelete
  const deleteUser=async(id)=>{
    console.log("inside delete functionL"+id);
    
    const res=await removeUser(id)
    console.log(res);
    if(res.status===200){
      // data successfully removed
      // pass response data to
      setdeleteData(res.data)
      getuserdetails()
    }
    else{
      console.log('error');
      
    }
    
  }
  

  // state to hold all user
  const [alluser,setalluser]=useState([])

  // define function to call getalluser api
  const getuserdetails=async()=>{
    const serverResponse= await getusers(searchKey)
    // console.log(serverResponse);
    setalluser(serverResponse.data)
    
  }
  // get register context using usestate
   const {registerData,setregisterData}= useContext(registerContext)

  // create state to display spinner

  const [showspin, setSpin] = useState(true)

  const navigate = useNavigate()


  // ro direct to register page when add bn clicked
  const addUser = () => {
    // navigate to register
    navigate('/register')
  }
  useEffect(()=>{
    // call getuser api
    getuserdetails()
    setTimeout(()=>{
      setSpin(false)
    },2000)
    
  },[searchKey])
  console.log(registerData);
  

 return (
  <>
    {
     registerData ?<Alert className='bg-success' variant='success' onClose={()=>setregisterData("")} dismissible>
        {registerData.fname.toUpperCase()} Successfully Registered...
      </Alert>:""
    } 
    {
     deleteData ?<Alert className='bg-danger' variant='danger' onClose={()=>setdeleteData("")} dismissible>
        {deleteData.fname.toUpperCase()} Successfully Deleted....
      </Alert>:""
    } 
   
      <div className='container mt-5'>
        <div className="firstdiv">
          {/* Search and button */}
          <div className="search_add d-flex justify-content-between">
            {/* Search */}
            <div className="search col-md-4">
              <Form className='d-flex'>
                <Form.Control
                  required
                  type="text"
                  placeholder="Search Employee name here" onChange={e=>setsearchKey(e.target.value)}
                />
                <Button className='ms-2' variant="success">
                  Search
                </Button>
              </Form>
            </div>
            {/* Add button */}
            <div className="add">
              <button onClick={addUser} className='btn btn-info'>
                <div className="fa-solid fa-user-plus fa-fade me-2">Add</div>
              </button>
            </div>
          </div>
        </div>

        <div className="seconddiv mt-3 mb-3">
          {showspin ? (
            <LoadingSpinner />
          ) : (
            <div>
              <h2>List of Employee</h2>
              {/* Table */}
              <HomeTable  displayData={alluser}
              handleDelete={deleteUser}/>
            </div>
          )}
        </div>
      </div>
   
  </>
);
}
export default Home