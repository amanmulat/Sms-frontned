import { LocalizationProvider, TimePicker } from '@mui/lab'
import { Button, Collapse, Dialog, Grid, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import {Api } from '../../../api/api.js'
import DateAdapter from '@mui/lab/AdapterDateFns'
import './roomEdit.css'

import { RoomEquipmentFill, RoomIdentity, TimeInterval, TimeIntervalContainer } from '../../roomAdd/roomAddComponents'
import { useMutation, useQueryClient } from 'react-query'
function RoomEdit({ open, handleClose , room , campusId}) {
  //useRef
  const roomName = useRef('')
  const roomCapacity = useRef('')
  
  //useState
  const [type, setType] = useState()
  const [location, setLocation] = useState()
  const [roomEquipments, setRoomEquipments] = useState([])
  const [occupationState, setOccupationState] = useState(room.occupation)
  
  // functions
  const formEditApi = async () => {
    const editForm = await Api.post('/admin/editroom', {
      campus_id: campusId,
      room: {
        room_id: room._id,
        name: roomName.current.value, 
        capacity: roomCapacity.current.value, 
        kind: type.title, 
        location: location.title,
        equipment: roomEquipments,
        occupation : occupationState
      }
    })
    return editForm
  }
  const show = async () => {
    await mutation.mutate()
    console.log({status : mutation.status})
    console.log({
      name: roomName.current.value, 
      capacity: roomCapacity.current.value, 
      type: type, 
      location: location,
      roomEquip: roomEquipments,
      occ : occupationState
    })
  }
  
  //useQuery 
  const queryClient = useQueryClient()
  const mutation = useMutation(formEditApi , {
    onSuccess: () => {
      queryClient.invalidateQueries(["getcampus"])
    }
  })

 
  //useEffect
  useEffect(() => {
   setLocation({title : room.location})
    setType({ title: room.kind })
    setRoomEquipments(room.equipment)
  }, [])
  
  //bugs 
  // coloring the room equipment items is buggy when removing or adding new ewquip items 
  console.log(room)
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