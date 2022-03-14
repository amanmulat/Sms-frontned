import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, Button, Collapse, IconButton, Chip , TextField, Tooltip ,  Grid, CircularProgress } from '@mui/material';
import './createGrade.css'
import { Add, Close } from '@mui/icons-material';
import { Api } from '../../../api/api';
function CreateGrade() {
    const subjects = [
        {title : "Math" , id : 1},
        {title : "Chemistry" , id : 2},
        {title : "Biology" , id : 3},
        {title : "Physics" , id : 4},
        {title : "Economics" , id : 5},
        {title : "History" , id : 6}
    ]
    
    const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const [addSectionButton, setAddSectionButton] = useState(false);
    const [addSubjectButton, setAddSubjectButton] = useState(false);
    const [section, setSection] = useState([]);
    const [open, setOpen] = useState(false);
    const [schoolData, setSchoolData] = useState([]);
    const [campus, setCampus] = useState([])
    const [selectedCampus, setSelectedCampus] = useState()
    const loading = open && schoolData.length === 0
    const [sectionName, setSectionName] = useState(null);
    const [homeRoom, setHomeRoom] = useState();
    const [selectedTeacher, setSelectedTeacher] = useState()
    const [subjectName, setSubjectName] = useState()
    const [roomName, setRoomName] = useState();
    const gradeName = useRef(null)
    const sectionRef = useRef(null);
    const addsectionButtonHandler = () => {
        setAddSectionButton(!addSectionButton)
    }
    const addSubjectButtonHandler = () => {
        setAddSubjectButton(!addSubjectButton)
    }
    const [sectionError, setSectionError] = useState(false)
    const pushSectionHandler = () => {
        if (!roomName || !homeRoom ) {
            setSectionError(true)
            setTimeout(() => {
                setSectionError(false)
            }, 3000);
            return
      }
        setSection([...section, { name: sectionRef.current.value, room: roomName, homeroom: homeRoom , campus : selectedCampus._id}])
        setSectionError(false)

    }
    const handelSectionDelete = (data) => {
        // setSection((chips)=> chips.filter((chip)=> chip.section !== data.section))
        setSection(section.slice(0 , -1))
    }
    const [subject, setSubject] = useState([])
    const [subjectError, setSubjectError] = useState(false)
    const addsubjecthandler = () => {
        if (!selectedTeacher || !subjectName) {
            setSubjectError(true)
            setTimeout(() => {
                setSubjectError(false)
            }, 3000);
            return
        }
        setSubject([...subject , {name : subjectName.title , teachers : selectedTeacher.staff._id }])
        setSubjectError(false)
    }
    const removeSubjectHandler = (data, index) => {
        setSubject(subject.slice(0 , index).concat(subject.slice(index + 1)))
    }
    
    useEffect(() => {
        let active = true 
        if (!loading) {
            return undefined
        }
        
        (async () => {
            const helper = await Api.post('/admin/formhelper', { school_id: "61ea9c3a1f5d693176b5d5df" })
           
            if (active) {
                if (helper) {
                 
                    const teacher =  helper.data.staffs.filter(obj => {
                            return obj.role === "Teacher"
                    })
                    const camp = helper.data.campus
                    console.log(helper.data)
                    setCampus(camp)
                    setSchoolData(teacher)
                   
                }
            }
        })();
      
      return () => {
        active= false ;
      };
    }, [loading]);
    
    const [errorForm, setErrorForm] = useState("")
    const [successForm, setSuccessForm] = useState("")
    const [formLoading, setFormLoading] = useState(false)
    const createGradeHandler = (event) => {
        event.preventDefault()
        setErrorForm("")
    
        const submitform = async () => {
            setFormLoading(true)
            setErrorForm("")
            setSuccessForm(false)
            try {
                const submited = await Api.post("/admin/creategrade", {
                    grade: gradeName.current.value,
                    year : "61c5bc9d00a6887bf4d10645",
                    school: "61ea9c3a1f5d693176b5d5df", 
                    campus : selectedCampus._id,
                    subject: subject,
                    sections : section
                })
                console.log(submited)
                setSuccessForm(true)
            setFormLoading(false)

                setSubject([])
                setSection([])
                setTimeout(() => {
                    setSuccessForm(false)
                }, 15000);
            } catch (error) {
               setFormLoading(false)
                console.log(error.response)
                setErrorForm(error.response.data.message)
                setTimeout(() => {
                    setErrorForm("")
                }, 10000);
            }
        }
        submitform()
    }
 
    const [roomOptions, setRoomOptions] = useState([])
    const roomRef = useRef(null)
    const campusContaner = (campus) =>{
        setSelectedCampus(campus)
        if(roomName){
               roomRef?.current?.getElementsByClassName(
                    'MuiAutocomplete-clearIndicator'
                    )[0].click()
        }
        if(!campus) {
            setRoomOptions(null)
            setRoomName(null)
            
        }else {
        setRoomOptions(campus.classrooms)
        }
    }
    console.log(selectedCampus)
    console.log(subject)
    console.log(section)
     
    return (
        <div className='createGrade shadow'>
           <h2 className="popupHeader">
                    Create Grade
            </h2>
            <div className="createGradeFormContainer">
                <form onSubmit={createGradeHandler}>
                    <div className="formInputs">
                        <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid item >
                                    <TextField sx={{ width: 200 }} variant="standard" inputRef={gradeName} required label="Grade" />
                            </Grid>
                            <Grid item>
                                <Autocomplete
                                    disablePortal
                                    onOpen={() => { setOpen(true) }}
                                    onClose={() => { setOpen(false) }}
                                    open={open}
                                    loading={loading}
                                    required
                                    id="combo-box-demo"
                                    options={campus}
                                    getOptionLabel={option => option.name}
                                    onChange={(e, value) => { campusContaner(value) }}
                                    sx={{ width: 200 }}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params} variant="standard" label="Campus"
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {loading  ? <CircularProgress color="inherit" size={20} /> : null}
                                                        {params.InputProps.endAdornment}
                                                    </React.Fragment>
                                                ),
                                            }}
                                        />}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="formInputs">
                        
                        <p className="dullLabel">Create Section</p>    
                        {
                            addSectionButton ?
                                    <Tooltip title="Close">
                                        <IconButton>
                                            {addSectionButton ? <Close onClick={addsectionButtonHandler}/> :<Add onClick={addsectionButtonHandler}/> }
                                        </IconButton>
                                    </Tooltip> 
                                : 
                                <Tooltip title="Add Section">
                                    <IconButton>
                                        {addSectionButton ? <Close onClick={addsectionButtonHandler}/> :<Add onClick={addsectionButtonHandler}/> }
                                    </IconButton>
                                </Tooltip>
                        }
                        <Collapse in={addSectionButton}>
                        
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <div className="formInput">
                                            <TextField sx={{ maxWidth: 250 }} variant="standard"
                                                disabled inputRef={sectionRef} required
                                                value={`Section ${alphabet[section.length]}`}
                                                onChange={(e) => setSectionName(e.target.value)} label="Section Name" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>

                                        <div className="formInput">
                                            <Autocomplete
                                                size='small'
                                                id="combo-box-demo"
                                                options={selectedCampus ?  roomOptions : [] }
                                                getOptionLabel={ option => option.name }
                                                ref={roomRef}
                                                onChange={(e, value) => {value ? setRoomName(value) : setRoomName(value) }}
                                                sx={{ maxWidth: 250 }}
                                                renderInput={(params) => 
                                                    <TextField 
                                                      
                                                        {...params} 
                                                        variant="standard" 
                                                        required label="Room" 
                                                    />}
                                                
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <div className="formInput">
                                            <Autocomplete
                                                disablePortal
                                                size='small'
                                                id="combo-box-demo"
                                                options={schoolData}
                                                getOptionLabel={(option)=> option.staff.name}
                                                onChange={(e, value) => {  {value ? setHomeRoom(value) : setHomeRoom(value)  }}}
                                                sx={{ maxWidth: 250 }}
                                                renderInput={(params) =>
                                                <TextField
                                                    {...params} variant="standard" required label="HomeRoom" 
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <React.Fragment>
                                                                {loading  ? <CircularProgress color="inherit" size={20} /> : null}
                                                                {params.InputProps.endAdornment}
                                                            </React.Fragment>
                                                        ),
                                                    }}
                                                />}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                                
                                        <div className="formInput">
                                            <Button variant="outlined" size='large'  sx={{ maxWidth: 250 }} onClick={pushSectionHandler} >Add Section</Button>
                                        </div>

                                    </Grid>
                                </Grid>
                            <Collapse in={sectionError}>
                                <div className="errorDiv">Fill out all required Field.</div>
                            </Collapse>                    
                        </Collapse>
                    
                    <div className='chipItems'>
                        {
                            section.map((data) => {
                                return (
                                    <div className="chipItem">
                                        <Chip
                                            label={data.name}
                                            onDelete={()=>handelSectionDelete(data)}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div >
                    </div>
                    <div className="formInputs">
                        <p className="dullLabel">Create Subjects</p>
                        {
                            addSubjectButton ?
                                    <Tooltip title="Close">
                                        <IconButton>
                                            {addSubjectButton ? <Close onClick={addSubjectButtonHandler}/> :<Add onClick={addSubjectButtonHandler}/> }
                                        </IconButton>
                                    </Tooltip> 
                                : 
                                <Tooltip title="Add Subject">
                                    <IconButton>
                                        {addSubjectButton ? <Close onClick={addSubjectButtonHandler}/> :<Add onClick={addSubjectButtonHandler}/> }
                                    </IconButton>
                                </Tooltip>
                        }
                        <Collapse in={addSubjectButton}>
                            <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item  >
                                    <div className="formInput">
                                        <Autocomplete
                                            id="Subject-List"
                                            freeSolo
                                            autoComplete
                                            options={subjects}
                                            getOptionLabel={option=> option.title}
                                            onChange={(e, value) => { value ?  setSubjectName(value) : setSubjectName("")} }
                                            sx={{ width: 200 }}
                                            renderInput={(params) => <TextField variant="standard" {...params} label="Subject" />}
                                        />
                                    </div>
                                </Grid>
                                <Grid item >
                                    <div className="formInput">
                                        <Autocomplete
                                            id="Teachers-List"
                                            options={schoolData}
                                            getOptionLabel={(option)=> option.staff.name}
                                            onChange={(e , value ) =>{value ? setSelectedTeacher(value) : setSelectedTeacher("")} }
                                            sx={{ width: 200 }}
                                            renderInput={(params) => <TextField variant="standard" {...params} label="Teachers" />}
                                        />
                                    </div>
                                </Grid>
                                <Grid item >
                                    <div className="formInput">
                                        <Button variant="outlined" size='large'  sx={{ maxWidth: 250 }} onClick={addsubjecthandler} >Add Subject</Button>
                                    </div>
                                </Grid>
                            </Grid>
                            <Collapse in={subjectError}>
                                <div className="errorDiv">Fill out all required Field.</div>
                            </Collapse>
                        </Collapse>
                        <div className='chipItems'>
                        {
                            subject.map((data , index) => {
                                return (
                                    <div className="chipItem">
                                        <Chip
                                            label={data.name}
                                            onDelete={()=>removeSubjectHandler(data , index)}
                                        />
                                    </div>
                                )
                            })
                        }
                        </div >
                    </div>
                    <div className="formInputs">
                        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item  >
                                <Button variant="contained" size='large'  sx={{ maxWidth: 250 }} type="submit" >Create Grade</Button>
                            </Grid>
                        </Grid>   
                    </div>
                    <Collapse in={errorForm || successForm || formLoading}>
                        {errorForm && <div className="errorDiv">{errorForm}</div>}
                        {successForm && <div className="successDiv">Successfully Created!</div>}
                        {formLoading && <div className="formLoading">Requesting . . . </div>}
                    </Collapse>    
                    
                </form>
            </div>
        </div>
    );
}

export default CreateGrade;
