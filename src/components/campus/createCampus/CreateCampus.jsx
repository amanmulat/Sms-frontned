import { Button, Chip, Collapse, Grid,  TextField, Tooltip } from '@mui/material'
import React from 'react'
import './createCampus.css'
import { useState , useRef } from 'react';
import { Add } from '@mui/icons-material';
import { Api } from '../../../api/api.js';
import {useMutation, useQueryClient} from 'react-query'
import RoomAdd from '../../roomAdd/RoomAdd';
function CreateCampus() {

  //useRef
  const campusName = useRef('')

  //usestate
  const [room, setRoom] = useState([])

  //functions
  const handleRoomRemove = (index) => {
     setRoom(room.slice(0 , index).concat(room.slice(index + 1)))
  }
  const sendRoomDataToParent = (value) => {
    setRoom(
        [...room,
          value
      ])
  }
  const handleCreateCampus = (event) => {
    event.preventDefault();
    mutation.mutate()
  }
  const formSubmitApi =  async () => {
    const formSubmit = await Api.post("/admin/createcamp", {
      school_id: "61ea9c3a1f5d693176b5d5df",
      campus: {
        name: campusName.current.value, 
        school: "61ea9c3a1f5d693176b5d5df",
        classrooms: room
      } 
    })
    return formSubmit
  }

  //reactquery
  const queryClient = useQueryClient()
  const mutation = useMutation(formSubmitApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getcampus"])
    }
  })

  
  //console.log on page renders

  return (
    <div className='createCampus shadow'>
      <h2 className="popupHeader">
        Create Campus
      </h2>
      <div className="createCampusFormContainer">
        <form className="createCampusForm" onSubmit={handleCreateCampus}>
          <div className="formInputs">
            <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
              <Grid item >
               <TextField sx={{ width: 200 }} variant="standard" inputRef={campusName} required label="Campus Name" />
              </Grid>
            </Grid>
          </div>
          <div className="formInputs">
            <p className="dullLabel">Rooms</p>
            <RoomAdd sendRoomDataToParent={sendRoomDataToParent} rooms={room}/>
            <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
              
              <Grid item xs={12}>
                  {/* <Collapse in={equipError}> */}
                  <div className="chipItems">
                    {room.map((data , index) => {
                        return (
                            <div className="chipItem">
                                <Chip
                                    label={data.name}
                                    onDelete={()=>handleRoomRemove(index)}
                                />
                            </div>
                        )
                    })} 
                  </div>
                </Grid>
              <Grid item xs={12}  sx={{mt: 2  , mb: 2}} >
                <Tooltip title="Create Campus">
                  <Button className='addbutton' type="submit"  >Create Campus<Add /> </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={12}  >
                <Collapse in={mutation.isSuccess || mutation.isError || mutation.isLoading }>
                  {mutation.isSuccess  && <div className="successDiv">Successfully Created!</div>}
                  {mutation.isLoading && <div className="formLoading">Requesting . . . </div>}
                  {mutation.isError && <div className="errorDiv">Error has Occured </div>}
                </Collapse>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCampus