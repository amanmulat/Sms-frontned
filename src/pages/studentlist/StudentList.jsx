import { Button, Collapse } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FeaturedGrade from '../../components/featuredgrade/FeaturedGrade'
import CreateGrade from '../../components/grade/createGrade/CreateGrade'
import { useGrade } from '../../context/context'
import "./studentList.css"
function StudentList() {
    const studentList = useGrade().studentList
    const getApplicants = useGrade().getApplicants
    const [createGrade, setCreateGrade] = useState(false);
    const createGradeHandler = () => {
            setCreateGrade(!createGrade)
        }
    useEffect(() => {
        if (!studentList) {
            getApplicants()
        }
  
    }, [])
    return (
        <div className='studentList'>
            <div className="createGradeButtonContainer"><Button className="createGradeButton" onClick={createGradeHandler}>{createGrade ? "Close" : "Create New Grade"}</Button> </div>
            <Collapse in={createGrade}>
                 <CreateGrade/>
            </Collapse>
            {studentList && <FeaturedGrade list={studentList.grades} another={studentList} studentList lg={6}/>}
            {!studentList && <div>No list</div>}
        </div>
    )
}

export default StudentList
