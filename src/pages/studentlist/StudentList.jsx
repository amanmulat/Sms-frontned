import React, { useEffect, useState } from 'react'
import { Api } from '../../api/api'
import FeaturedGrade from '../../components/featuredgrade/FeaturedGrade'
import { useGrade } from '../../context/context'
import "./studentList.css"
function StudentList() {
    const studentList = useGrade().studentList
    const getApplicants = useGrade().getApplicants
    useEffect(() => {
        if (!studentList) {
            getApplicants()
        }
  
    }, [])
    return (
        <div className='studentList'>
            {studentList && <FeaturedGrade list={studentList.grades} another={studentList} studentList lg={6}/>}
            {!studentList && <div>No list</div>}
        </div>
    )
}

export default StudentList
