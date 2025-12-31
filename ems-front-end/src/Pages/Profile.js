import React, { useState, useEffect } from 'react'
import { Button, Card, Row } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import Select from 'react-select';
import LoadingSpinner from '../Components/LoadingSpinner';
import {getauser} from '../services/allApis'
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../services/base_url';



function Profile() {
  // state to hold all user
  const [user,setUser]=useState([])
    const { id } = useParams();


  // define function to call getalluser api
  const getauserdetails=async(id)=>{
    const serverResponse= await getauser(id)
    // console.log(serverResponse);
    setUser(serverResponse.data)
    
  }
  const [showspin, setSpin] = useState(true)
  useEffect(() => {
    if (id) {
      getauserdetails(id);
      setTimeout(() => {
        setSpin(false);
      }, 2000);
    }
  }, [id]);
  return (
    <>
      {
        showspin ? <LoadingSpinner /> :
          <div className='container mt-5'>
            <Card className='shadow col-lg-6 mx-auto'>
              <Card.Body>
                <Row>
                  <div className="col">
                    <div className="profile_img d-flex justify-content-center">
                      <img className=' border p-1 rounded-circle' width={'200px'} height={'200px'} src={`${BASE_URL}/uploads/${user.profile}`} alt="profile" />
                    </div>
                  </div>
                </Row>
                <div className="text-center mt-3">
                  <h3>{user.fname}&nbsp;{user.lname}</h3>
                  <h5><i class="fa-solid fa-envelope text-info"></i>:-{user.email}</h5>
                  <h5><i class="fa-solid fa-mobile text-warning"></i>:-{user.mobile}</h5>
                  <h5><i class="fa-solid fa-person text-info"></i>:-{user.gender}</h5>
                  <h5><i class="fa-solid fa-location-dot text-danger"></i>:-{user.location}</h5>
                  <h5><i class="fa-solid fa-chart-line text-success"></i>:-{user.status}</h5>
                </div>
              </Card.Body>
            </Card>
          </div>
        }    
      </>
    ) 
}

      export default Profile