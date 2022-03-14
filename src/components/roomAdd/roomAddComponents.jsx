import React, { useRef , useEffect , useState } from 'react'
import {  LocalizationProvider, TimePicker } from '@mui/lab'
import { Button, Grid, IconButton, TextField, Tooltip } from '@mui/material'
import DateAdapter from '@mui/lab/AdapterDateFns'
import AutoDialog from '../autocomplete/AutoDialog'
import { Add } from '@mui/icons-material'
import RoomEquipmentEdit from '../dialog/roomEdit/roomEquipmentEdit/RoomEquipmentEdit'

function RoomIdentity({locationValue ,setLocationValue , setType , type , roomTitle  , capacity  , roomName , roomCapacity}) {
   
    //useState 
   
    const [dialogValue, setDialogValue] = useState({
            title: ''
    });
    const [locationOptions, setlocationOptions] = useState([
            {title : "first floor" },
            {title : "second floor"},
            {title : "third floor"},
            {title : "fourth floor"},
    ])
    const [kind, setKind] = useState([
            {title : "Regular"},
            {title : "ASTP"},
    ])

    //functions
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
        setDialogValue({ title: "" })
    };
    

    
    
    return (
        <>
            <Grid item xs={12} md={6} lg={3}  >
                <TextField sx={{ width: 200 }} variant="standard" inputRef={roomName} defaultValue={roomTitle }label="Room Name" />
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
                    defaultValue={capacity}
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
        </>
    )
}
function TimeInterval({ index , onDateChange , occupationState}) {

    //useState 
    const [startTime, setStartTime] = useState(occupationState[index].time.start)
    const [endTime, setEndTime] = useState(occupationState[index].time.end)
    //function
    const handleStartTimeChange = (newValue) => {
        if (endTime) {
            if (!newValue) { setEndTime(null); setStartTime(null); return} else {
                if (newValue.getTime() >= new Date(endTime).getTime()) {
                    setEndTime(newValue)
                    setStartTime(newValue)
                    return onDateChange({end : newValue , start : newValue }, index)
                }
                }
        }
        else {
        setEndTime(newValue)
        setStartTime(newValue)
        return onDateChange({end : newValue , start : newValue }, index)
        }
        return onDateChange({end : endTime , start : newValue }, index)

    }
    const handleEndTimeChange = (newValue) => {
       
        if (startTime) {
        if (!newValue) { setStartTime(null); setEndTime(null); return} else {
            if (newValue.getTime() <= new Date(startTime).getTime()) {
                setStartTime(newValue)
                setEndTime(newValue)
                return onDateChange({end : newValue , start : newValue }, index)
            }
        }
        }else {
            setStartTime(newValue)
            setEndTime(newValue)
            return onDateChange({end : newValue , start : newValue }, index)
        }
        return onDateChange({end : newValue , start : startTime }, index)

    }
  
    return (
        <>
            <Grid item xs={12} md={6} lg={3}>
                <TimePicker
                value={occupationState[index].time.start}
                onChange={(newValue)=>{handleStartTimeChange(newValue)}}
                renderInput={(params) => <TextField {...params} variant="standard" label="Start Time" />}
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <TimePicker
                value={occupationState[index].time.end}
                onChange={(newValue)=>{handleEndTimeChange(newValue)}}
                renderInput={(params) => <TextField {...params} variant="standard" label="End Time" />}
                />
            </Grid>
        </>
    )
}
function TimeIntervalContainer({ occupationState , setOccupationState  }) {
    // const [occupationState, setOccupationState] = useState(occupation)
    //function
    const onDateChange = (data , index) => {
          
        const edit = Object.assign([...occupationState], {
            [index]: {
                ...occupationState[index], 
                time  : data
            }
        })
        
        setOccupationState(edit)
    }

    return (
        <>
            <LocalizationProvider dateAdapter={DateAdapter}>
            {
              //this only works if the data comes with time frame 
              occupationState.map((time , index) => {
                return (
                    <TimeInterval  index={index} onDateChange={onDateChange} occupationState={occupationState}/>
                )
              })
            }
          </LocalizationProvider> 
        </>
    )
}
function RoomEquipmentFill({ roomEquipments, setRoomEquipments }) {
    //props are states coming from parent
    //useState
    // const [roomEquipments, setRoomEquipments] = useState([])

    //refs
    const equipmentName = useRef('')
    const equipmentQuantity = useRef('')
    const equipmentDescription = useRef('')
    //functions
    const removeItem = (index) => {
    let removeCount =  roomEquipments[index].quantity - 1
        const edit = Object.assign([...roomEquipments], {
        [index]: {
            ...roomEquipments[index], 
            quantity : removeCount
        }
        })
        //stackoverflow answer is much faster 
        // const edit = roomEquipments
        // edit[index].quantity = edit[index].quantity - 1
        setRoomEquipments(edit)
    }
    const addItem = (index) => {
        let addCount = parseInt(roomEquipments[index].quantity) + parseInt(1)
        const edit = Object.assign([...roomEquipments], {
        [index]: {
            ...roomEquipments[index], 
            quantity : addCount
        }
        })
        setRoomEquipments(edit)

    }
    const addEquipItem = ()=>{
        setRoomEquipments([{name : equipmentName.current.value , quantity : equipmentQuantity.current.value , description : equipmentDescription.current.value} , ...roomEquipments ])
    }
    const removeEquipItem = (index) => {
      
         setRoomEquipments(roomEquipments.slice(0 , index).concat(roomEquipments.slice(index + 1)))
    }
    const EditEquipItem = (index, Data) => {
        
        const edit = Object.assign([...roomEquipments], {
        [index]: {
            ...roomEquipments[index], 
                quantity: Data.items ,
                name: Data.name, 
                description : Data.description
        }
        })
        setRoomEquipments(edit) 
    }
    //useEffect
   
 
    return (
        <>
            <Grid container item xs={12} md={6} lg={3} >
                <RoomEquipmentFillIdentity equipmentDescription={equipmentDescription} equipmentQuantity={equipmentQuantity}  equipmentName={equipmentName} />
                <Grid item xs={12} sx={{mt: 2  , mb: 2}} >
                    <Tooltip title="Add Room Equipment">
                            <Button onClick={()=>{addEquipItem()}}>Add Equipment</Button>
                    </Tooltip>
                </Grid>
            </Grid>
            {
                roomEquipments.map((equip, index) => {
       
                return (
                <Grid item xs={12}  md={6} lg={3}>
                    <RoomEquipmentEdit equipment={equip} removeItem={ removeItem} removeEquipItem={removeEquipItem} EditEquipItem={EditEquipItem}  addItem={ addItem} index={index} />
                </Grid>
                )
                })
            }
        </>
    )
}
function RoomEquipmentFillIdentity({ name, quantity, description, equipmentName, equipmentDescription, equipmentQuantity }) {
    //to reuse later for a roomEquipmentDeleteEdit in rooomEquipmentEdit
    return (
        <>
            <Grid item xs={12}>
                <TextField sx={{ width: 200 }} defaultValue={name} inputRef={equipmentName} variant="standard"  label="Name" />
            </Grid>
            <Grid item xs={12}>
                <TextField sx={{ width: 200 }} defaultValue={quantity} inputRef={equipmentQuantity} variant="standard" type="number"  label="Quantity" />
            </Grid>
            <Grid item xs={12} >
                <TextField variant="standard"  defaultValue={description} inputRef={equipmentDescription} label="Description" />
            </Grid>
        </>
    )
}
export {
    TimeInterval,
    TimeIntervalContainer,
    RoomIdentity,
    RoomEquipmentFill,
    RoomEquipmentFillIdentity 
}