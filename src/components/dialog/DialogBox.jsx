import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React from 'react'

function DialogBox({open , handleClose , handleSubmit , dialogValue  , setDialogValue ,dialogTitle , dialogContentText , submitButton }) {
  return (
    <Dialog open={open} onClose={handleClose}>
     
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
                {dialogContentText}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.title}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  title: event.target.value,
                })
              }
              label="title"
              type="text"
              variant="standard"
            />
           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={()=>{handleSubmit()}}>{submitButton}</Button>
          </DialogActions>
     
      </Dialog>
  )
}

export default DialogBox