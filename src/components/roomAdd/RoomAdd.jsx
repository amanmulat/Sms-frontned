import { Add } from '@mui/icons-material'
import { Button, Chip, Collapse, Grid, IconButton, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AutoDialog from '../autocomplete/AutoDialog'
import { TimePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns'
function RoomAdd({sendRoomDataToParent , rooms}) {
    //useRef
    const roomName = useRef('')
    const roomCapacity = useRef('')
    const equipmentName = useRef('')
    const equipmentQuantity = useRef('')
  const equipmentDescription = useRef('')
   
    //useState 
  const [type, setType] = useState("")

 
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [roomEquip, setRoomEquip] = useState([])
    const [equipError, setEquipError] = useState([ false , "" ])
    const [roomAddError, setRoomAddError] = useState([ false , ""])
    const [locationValue, setLocationValue] = useState(null)
    const [kind, setKind] = useState([
        {title : "Regular"},
        {title : "ASTP"},
    ])
    const [locationOptions, setlocationOptions] = useState([
        {title : "first floor" },
        {title : "second floor"},
        {title : "third floor"},
        {title : "fourth floor"},
    ])

    const [dialogValue, setDialogValue] = useState({
        title: ''
    });
    //function
    const handleSubmit = () => {
        setLocationValue({
        title: dialogValue.title
        });
        setlocationOptions([...locationOptions, { title: dialogValue.title, }])
        setDialogValue({title : ""})
    
    };
    const handleKindSubmit = () => {
        setType({
        title: dialogValue.title
        });
        setKind([...kind, { title: dialogValue.title, }])
        setDialogValue({title : ""})
    };
    const handleRoomEquipmentAdd = () => {
        setEquipError([ false , ""])
        if (!equipmentDescription.current.value || !equipmentName.current.value || !equipmentQuantity.current.value) {
        return setEquipError([true , "Please fill out the form."])
        }
        const similarRoom = roomEquip.find(obj => {
        return obj.name === equipmentName.current.value
        })
        if(similarRoom) return setEquipError([true , "A room with similar name already in the list!"])
        setRoomEquip([
        ...roomEquip,
        {
            name: equipmentName.current.value,
            quantity: equipmentQuantity.current.value,
            description: equipmentDescription.current.value
        }])
        equipmentDescription.current.value = ""
        equipmentName.current.value = ""
        equipmentQuantity.current.value = ""
    }
    const handleRoomEquipmentRemove = (index) => {
        setRoomEquip(roomEquip.slice(0 , index).concat(roomEquip.slice(index + 1)))
    }
    const handleStartTimeChange = (newValue) => {
        if (endTime) {
        if (!newValue) { setEndTime(null); setStartTime(null); return} else {
            if (newValue.getTime() >= endTime.getTime()) {
                setEndTime(newValue)
            }
            }
        }
        else {
        setEndTime(newValue)
        }
        setStartTime(newValue)
    }
    const handleEndTimeChange = (newValue) => {
        console.log(newValue + " new value")
        if (startTime) {
        if (!newValue) { setStartTime(null); setEndTime(null); return} else {
            if (newValue.getTime() <= startTime.getTime()) {
            setStartTime(newValue)
            }
        }
        }else {
            setStartTime(newValue)
        }
        setEndTime(newValue)
    }
    const handleOneRoomAdd = (sure) => {
        setRoomAddError([false , ""])
        setEquipError([false , ""])
        if (!roomName.current.value || !locationValue || !roomCapacity.current.value || !type || !startTime  ||  !endTime) {
        return setRoomAddError([true  , "Please fill out this rooms descriptions."])
        }
        if (rooms) {
            const similarRoom = rooms.find(obj => {
            return obj.name === roomName.current.value
            })
            if(similarRoom) return setRoomAddError([true , "An equipment with similar name already in the list!"])
        }
        if (roomEquip.length === 0 && !sure) {
            return setEquipError([true , "Are you sure you dont want register any equipment to this room" , "make sure"])
        }
        sendRoomDataToParent(
            {
                name: roomName.current.value,
                capacity: roomCapacity.current.value,
                equipment: roomEquip,
                location: locationValue.title,
                kind: type.title,
                occupation: {
                    time: {
                    start: startTime, 
                    end : endTime 
                    }
                }
            }
        )
        equipmentDescription.current.value = ""
        equipmentName.current.value = ""
        equipmentQuantity.current.value = ""
        roomCapacity.current.value = null
        roomName.current.value = ""
        setLocationValue("")
        setType("")
        setStartTime(null)
        setEndTime(null)
    }
    return (
        <div className='roomAdd'>
            <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item xs={12} md={6} lg={3}  >
                    <TextField sx={{ width: 200 }} variant="standard" inputRef={roomName} label="Room Name" />
                </Grid>
                <Grid item xs={12} md={6} lg={3} >
                    <AutoDialog
                    autoValue={locationValue}
                    setDialogValue={setDialogValue}
                    setAutoValue={setLocationValue}
                    options={locationOptions}
                    handleSubmit={handleSubmit}
                    dialogValue={dialogValue}
                    dialogTitle="Add Location"
                    dialogContentText="Did you miss rooms location in our list? Please, add it!"
                    submitButton="Add"
                    textFieldtext="Location"
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <TextField
                        sx={{ width: 200 }}
                        label="Capacity"
                        variant='standard'
                        inputRef={roomCapacity} 
                        type="number"
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3} >
                <AutoDialog
                  autoValue={type}
                  setDialogValue={setDialogValue}
                  setAutoValue={setType}
                  options={kind}
                  handleSubmit={handleKindSubmit}
                  dialogValue={dialogValue}
                  dialogTitle="Add the type of room "
                  dialogContentText="Did you miss rooms type in our list? Please, add it!"
                  submitButton="Add"
                  textFieldtext="Type"
                />
              </Grid>
              <Grid container item sx={{ ml: 2 , mt : 2 }}>
                <Grid item xs={12}  >
                  <p className="dullLabel">Room Equipments</p>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <TextField sx={{ width: 200 }} inputRef={equipmentName} variant="standard"  label="Name" />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <TextField sx={{ width: 200 }} inputRef={equipmentQuantity} variant="standard" type="number"  label="Quantity" />
                </Grid>
                <Grid item xs={12} md={6} lg={6} >
                  <TextField variant="standard"   inputRef={equipmentDescription} label="Description" />
                </Grid>
                <Grid item xs={12} md={6} lg={3} sx={{mt: 2  , mb: 2}} >
                  <Tooltip title="Add Room Equipment">
                    <IconButton>
                      <Add className='addbutton' onClick={()=>{handleRoomEquipmentAdd()}}/> 
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  {/* <Collapse in={equipError}> */}
                  <div className="chipItems">
                    {roomEquip.map((data , index) => {
                        return (
                            <div className="chipItem">
                                <Chip
                                    label={data.name}
                                    onDelete={()=>handleRoomEquipmentRemove(index)}
                                />
                            </div>
                        )
                    })}
                  </div>
                  {/* </Collapse> */}
                </Grid>
                <Grid item xs={12}  >
                  <Collapse in={equipError[0]}>
                    <div className="errorDiv">{equipError[2] ?<> {equipError[1]}  <Button onClick={()=> {handleOneRoomAdd("yes")}} className='muiButton'>Yes</Button> </> :equipError[1]  }</div>
                  </Collapse>
                </Grid>
              </Grid> 
              <Grid item xs={12}><p className="dullLabel">Room Occupation</p></Grid>
                <LocalizationProvider dateAdapter={DateAdapter}>
                <Grid item xs={12} md={6} lg={3}>
                  <TimePicker
                    value={startTime}
                    onChange={(newValue)=>{handleStartTimeChange(newValue)}}
                    renderInput={(params) => <TextField {...params} variant="standard" label="Start Time" />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <TimePicker
                    value={endTime}
                    onChange={(newValue)=>{handleEndTimeChange(newValue)}}
                    renderInput={(params) => <TextField {...params} variant="standard" label="End Time" />}
                  />
                </Grid>
               
              </LocalizationProvider> 
              
                <Grid item xs={12}  sx={{mt: 2  , mb: 2}} >
                <Tooltip title="Add Room to your Room List">
                    <Button className='addbutton' onClick={()=>{handleOneRoomAdd()}}>Add Room <Add /> </Button>
                </Tooltip>
                </Grid>
             
                <Grid item xs={12}  >
                    <Collapse in={roomAddError[0]}>
                    <div className="errorDiv">{roomAddError[1]  }</div>
                    </Collapse>
                </Grid> 
                
            </Grid>
            
        </div>
    )
}

export default RoomAdd