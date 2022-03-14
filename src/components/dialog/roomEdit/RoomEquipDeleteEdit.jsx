import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React from 'react'

function RoomEquipDeleteEdit({ children, dialogData, handleDialogClose, open, handleDialogSubmit }) {
    console.log({ dua: dialogData })
    let color 
    if (dialogData.submitButton === "Delete") {
        color = "error"
    }
  return (
      <Dialog open={open} onClose={handleDialogClose}>
          <DialogTitle>{dialogData.dialogTitle}</DialogTitle>
          {children}
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
              <Button type="submit" color={color} onClick={() => { handleDialogSubmit(dialogData.submitButton); handleDialogClose(); }}>{dialogData.submitButton}</Button>
          </DialogActions>
    </Dialog>
  )
}

export default RoomEquipDeleteEdit