import { Button, Collapse } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Api } from '../../api/api'
import CreateCampus from '../../components/campus/createCampus/CreateCampus'
import Featured from '../../components/featured/Featured.jsx'
import './campus.css'
//rule
// collect all state in one place
// use react query for this 
function Campus() {
  //useState 
  const [createCampusButton, setCreateCampusButton] = useState(false)
   //function
    const getCampus = async () => {
      return Api.get("/admin/getcamp", { params: { school_id: "61ea9c3a1f5d693176b5d5df" } }).then(
          res => res.data
        )
        // return thedata
    }
  
  //query 
  const { data, status, error } = useQuery("getcampus", getCampus)
  
  
  // console.log()
  // console.log(data.data.campus)
  return (
    <div className='campus'>
      <div className="createCampusButtonContainer">
        <Button className='createCampusButton'
          onClick={() => { setCreateCampusButton(!createCampusButton) }}>
          {createCampusButton ? "Close" : "Create Campus"}
        </Button>
      </div>
      <Collapse in={createCampusButton}>
        <CreateCampus/>
      </Collapse>

      <Featured list={data} campus/>
    </div>
  )
}

export default Campus