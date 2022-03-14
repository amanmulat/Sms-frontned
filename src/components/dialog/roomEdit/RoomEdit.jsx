import { LocalizationProvider, TimePicker } from '@mui/lab'
import { Button, Collapse, Dialog, Grid, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

import DateAdapter from '@mui/lab/AdapterDateFns'
import './roomEdit.css'

import { RoomEquipmentFill, RoomIdentity, TimeInterval, TimeIntervalContainer } from '../../roomAdd/roomAddComponents'
function RoomEdit({ open, handleClose , room }) {
  //useRef
  const roomName = useRef('')
  const roomCapacity = useRef('')
  
  //useState
  const [type, setType] = useState()
  const [location, setLocation] = useState()
  const [roomEquipments, setRoomEquipments] = useState([])
  const [occupationState, setOccupationState] = useState(room.occupation)

  
  //functions
  const show = () => {
    console.log({
      name: roomName.current.value, 
      capacity: roomCapacity.current.value, 
      type: type, 
      location: location,
      roomEquip: roomEquipments,
      occ : occupationState
    })
  }
  
 
  //useEffect
  useEffect(() => {
   setLocation({title : room.location})
    setType({ title: room.kind })
    setRoomEquipments(room.equipment)
  }, [])
  
  //bugs 
  // coloring the room equipment items is buggy when removing or adding new ewquip items 
  
  return (
    <Dialog fullWidth={true} maxWidth="lg" open={open} onClose={handleClose} scroll="body">
      <div className="roomEditContainer">
        <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
          <RoomIdentity
            locationValue={location}
            setLocationValue={(data)=>{setLocation(data)}}
            type={type} 
            setType={(data)=>{setType(data)}}
            roomTitle={room.name}
            capacity={room.capacity}
            roomName={roomName}
            roomCapacity={roomCapacity}
          />
          <Grid  item xs={12} >
              <h3 className='roomeditTitle'>Room Equipment Edit</h3>  
          </Grid>
          <RoomEquipmentFill
            roomEquipments={roomEquipments}
            setRoomEquipments={(data) => { setRoomEquipments(data) }} />
          <Grid  item xs={12} >
            <h3 className='roomeditTitle'>Room Occupation Time</h3>  
          </Grid>
          <TimeIntervalContainer occupationState={occupationState} setOccupationState={setOccupationState} /> 
          <Grid item xs={12}>
            <div className="roomEditButtonContainer">
              <div className="roomEditButton">
                <Button onClick={handleClose} >Cancel</Button>
              </div>
              <div className="roomEditButton">
                <Button variant="contained" color="success" onClick={show} >Save</Button>
              </div>
            </div>
          </Grid>
        </Grid>
        
      </div>
    </Dialog>
  )
}

export default RoomEdit