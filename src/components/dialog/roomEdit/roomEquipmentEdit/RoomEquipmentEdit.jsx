import { Add, Remove } from '@mui/icons-material'
import { Button, Grid, IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { RoomEquipmentFillIdentity } from '../../../roomAdd/roomAddComponents'
import RoomEquipDeleteEdit from '../RoomEquipDeleteEdit'
import './roomEquipmentEdit.css'
function RoomEquipmentEdit({ equipment , removeItem , addItem  , index , removeEquipItem , EditEquipItem}) {
    // useState
    const [first, setFirst] = useState()
    const [color, setColor] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogData, setDialogData] = useState({
        dialogTitle : "",
            submitButton : ""
    })
    //useEffect
    useEffect(() => {
        setFirst(equipment.quantity)
    }, [])
    useEffect(() => {
        colorChange()
    }, [equipment.quantity])
    //useRefs 
    const equipmentName = useRef('')
    const equipmentQuantity = useRef('')
    const equipmentDescription = useRef('')
    //function
    const colorChange = () => {
        if (first < equipment.quantity) {
           return setColor("incrementColor")
        }
        if (first > equipment.quantity) {
            return setColor("decrementColor")
        }
        return  setColor('')
    }
    const removeItemClick = () => {
        removeItem(index)
        // colorChange()
    }
     const addItemClick = () => {
         addItem(index)
        //  colorChange()
    }
    const setDialogOpenOnDelete = () => {
        setDialogOpen(true)
        setDialogData({
            dialogTitle : "Delete?",
            submitButton : "Delete"
        })
    }
    const setDialogOpenOnEdit = () =>{
        setDialogOpen(true)
        setDialogData({
            dialogTitle : "Edit",
            submitButton : "Edit"
        })
        // equipmentName.current.value="thsifaksndfkl"
    }
    const handleDialogSubmit = (submitKind) => {
        //index comming from component props
        if (submitKind === "Delete") {
            removeEquipItem(index)
        }
        if (submitKind === "Edit") {
            const data = {
                name: equipmentName.current.value, 
                items: equipmentQuantity.current.value, 
                description : equipmentDescription.current.value 
            }
            EditEquipItem(index , data)
        }
    }
    return (
        <div className={`roomEquipmentEdit ${color}`}> 
            <h3 className='roomEditLabel'>Name</h3>
            <h3 className='roomEditValue'>{ equipment.name }</h3>
            <h3 className='roomEditLabel'>Items</h3>
            <div className="itemValueContainer">
                <IconButton onClick={removeItemClick}>
                    <Remove fontSize='small' />
                </IconButton>
                <h3 className='roomEditValue'>{ equipment.quantity }</h3>
                <IconButton  onClick={addItemClick}>
                    <Add fontSize='small' /> 
                </IconButton>
            </div>
            <h3 className='roomEditLabel'>Description</h3>
            <p className='roomEditValue'>{equipment.description}</p>
            <div className="roomEquipmentEditButton">
                <Button onClick={()=>{setDialogOpenOnEdit()}}>Edit</Button>
                <Button color="error" onClick={()=>{setDialogOpenOnDelete()}}>Delete</Button>
            </div>
            <RoomEquipDeleteEdit
                dialogData={dialogData}
                handleDialogSubmit={handleDialogSubmit}
                open={dialogOpen}
                handleDialogClose={() => { setDialogOpen(false); }} >
                {dialogData.submitButton === "Delete" &&
                    <>
                        <h3 className='roomEditLabel'>Name</h3>
                        <h3 className='roomEditValue'>{ equipment.name }</h3>
                        <h3 className='roomEditLabel'>Items</h3>
                        <div className="itemValueContainer">
                            <h3 className='roomEditValue'>{ equipment.quantity }</h3>
                        </div>
                        <h3 className='roomEditLabel'>Description</h3>
                        <p className='roomEditValue'>{equipment.description}</p>
                
                    </>}
                {dialogData.submitButton === "Edit" &&
                    <Grid container> 
                        <RoomEquipmentFillIdentity
                            name={equipment.name}
                            quantity={equipment.quantity}
                            description={equipment.description}
                            equipmentName={equipmentName}
                            equipmentQuantity={equipmentQuantity}
                            equipmentDescription={equipmentDescription}
                        />
                    </Grid>
                    }
            </RoomEquipDeleteEdit>
        </div>
    )
}

export default RoomEquipmentEdit