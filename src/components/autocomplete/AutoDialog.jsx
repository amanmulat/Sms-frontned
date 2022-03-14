import { Autocomplete, createFilterOptions, TextField } from '@mui/material';
import React, { useState } from 'react'
import DialogBox from '../dialog/DialogBox.jsx';

function AutoDialog({
    autoValue,
    setDialogValue,
    setAutoValue,
    options,handleSubmit,
    dialogValue, dialogTitle, dialogContentText, submitButton, textFieldtext , textFieldRef }) {
    const filter = createFilterOptions();

    //useState 
    const [toggleOpen, setToggleOpen] = useState(false)
    //function 
    const handleClose = () => {
        setToggleOpen(false)
    }
    const handleSubmitIn = () => {
        handleClose()
        handleSubmit()

    }
    return (
      <>
            <Autocomplete
            value={autoValue}
            onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
                // timeout to avoid instant validation of the dialog's form.
                setTimeout(() => {
                // toggleOpen(true);
                    setToggleOpen(true)
                setDialogValue({
                    title: newValue
                });
                });
              
            } else if (newValue && newValue.inputValue) {
                // toggleOpen(true);
                    setToggleOpen(true)
                setDialogValue({
                title: newValue.inputValue
                });
                
            } else {
                setAutoValue(newValue); 
            }
            }}
            filterOptions={(options, params) => {
            const filtered = filter(options, params);
    
            if (params.inputValue !== '') {
                filtered.push({
                inputValue: params.inputValue,
                title: `Add "${params.inputValue}"`,
                });
            }
    
            return filtered;
            }}
            id="free-solo-dialog-demo"
            options={options}
            getOptionLabel={(option) => {
            // e.g value selected with enter, right from the input
            if (typeof option === 'string') {
                return option;
            }
            if (option.inputValue) {
                return option.inputValue;
            }
            return option.title;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            
            freeSolo
            
                renderInput={(params) => <TextField {...params} variant="standard" label={textFieldtext} inputRef={textFieldRef} />}
            />
            <DialogBox
                open={toggleOpen}
                setDialogValue={setDialogValue}
                handleSubmit={handleSubmitIn}
                handleClose={handleClose}
                dialogValue={dialogValue}
                dialogTitle={dialogTitle}
                dialogContentText={dialogContentText}
                submitButton={submitButton}
                />
      </>
  )
}

export default AutoDialog