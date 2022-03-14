import { Button, Collapse, Grid, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Api } from '../../../api/api.js'
import {stringDateToHoursAndMinute} from '../../../helper/helper.js'
import RoomAdd from '../../roomAdd/RoomAdd.jsx'
import './roomCard.css'
import RoomEdit from '../../dialog/roomEdit/RoomEdit.jsx'

function RoomCards({title , roomList , campusId,  xs = {xs}, md = {md}, lg = {lg} }) {
  //useState
  const [openAddRoom, setOpenAddRoom] = useState(false)

  // functions
  const sendRoomDataToParent = async (value) => {
   await mutation.mutate(value)
    
  }
  const addRoomToCampus = async (value) => {
    if (!value) return 
    console.log(roomList)
    const addRoom = await Api.post("/admin/addroom", {
      campus_id: campusId, 
      room : value
    })
    return addRoom
  }
  //react query
  const queryClient = useQueryClient()
  const mutation = useMutation(addRoomToCampus , {
    onSuccess: () => {
      queryClient.invalidateQueries(["getcampus"])
    }
  })
  //useEffect 
 
  
  return (
    <div className='roomCards '>
      <div className="roomHeader">
        <h2 className="featuredTitle">{title}</h2>
       
        <Button onClick={()=>{setOpenAddRoom(!openAddRoom)}}>Add Room</Button>
      </div>
      <Collapse in={openAddRoom}>
        <RoomAdd sendRoomDataToParent={sendRoomDataToParent} />
        <Collapse in={mutation.isSuccess || mutation.isError || mutation.isLoading }>
          {mutation.isSuccess  && <div className="successDiv">Room Added Successfully Created!</div>}
          {mutation.isLoading && <div className="formLoading">Requesting . . . </div>}
          {mutation.isError && <div className="errorDiv">Error has Occured </div>}
        </Collapse>
      </Collapse>
      <Grid container spacing={3}>
          {roomList?.map(room => {
                  return (
                      <Grid item xs={xs} md={md} lg={lg}>
                          {room &&  <RoomCard key={room._id} room={room}/>}
                      </Grid>
                  )
              }
              )
            }
      </Grid>    
    </div>
  )
}
function RoomCard({ room }) {
  const [dialogOpenState, setDialogOpenState] = useState(false)
  console.log(dialogOpenState)
  return (

    <div className='roomCard '>
      <div className="cardTitleContainer">
        <h3 className="roomCardTitleLabel">Room name</h3>
        <span className="roomCardTitle">{room.name}</span>
      </div>
      <div className="cardTitleContainer">
        <h3 className="roomCardTitleLabel">Capacity</h3>
        <span className="roomCardTitle">{room.capacity}</span>
      </div>
      <div className="cardTitleContainer">
        <h3 className="roomCardTitleLabel">Type</h3>
        <span className="roomCardTitle">{room.kind}</span>
        <span className="roomCardTitle">{room._id}</span>
      </div>
       <div className="cardTitleContainer">
        <h3 className="roomCardTitleLabel">Occupation</h3>
        {room.occupation && room.occupation.map(occ => {
          return (<span className="roomCardTitle">{stringDateToHoursAndMinute(occ.time.start)} to {stringDateToHoursAndMinute(occ.time.end)} </span>)
        })}
      </div>
      <div className="">
          <Button onClick={()=>setDialogOpenState(true)} >Edit</Button>
      </div>
      
      <RoomEdit room={room} handleClose={()=>setDialogOpenState(!dialogOpenState)} open={dialogOpenState} />
      
    </div>
  )
}

export default RoomCards