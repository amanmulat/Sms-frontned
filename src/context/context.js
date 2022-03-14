import React, { useContext, useState } from "react"
import { Api } from "../api/api"
// to auto fill and better understan
const ContextProvider = React.createContext({
    grade: null, 
    getGrade: () => { },
    studentList : null ,
    getApplicants: () => { }, 
    schoolInfo: null , 
    formHelper: ()=>{}
})

export function useGrade() {
    return  useContext(ContextProvider)
}


export function TheContextProvider({ children }) {
    const [grades, setGrades] = useState(null)
    const getGrade = async () => {
        await Api.get("/admin/getgrades",{params : {year : "61c5bc9d00a6887bf4d10645"}} ).then(res => {
            setGrades(res.data)
            console.log(res.data)
        })
    }
    const [studentList, setStudentList] = useState("")
    const getApplicants = async () => {
        let data 
         Api.get('/admin/studentapplicants', { params: { school_id: "61ea9c3a1f5d693176b5d5df" } }).then((res) => {
            data = res.data
            console.log(res.data)
            setStudentList(data)
        })

    }
    const enrollhandler = async ({ stud, grd }) => {
        console.log("what is happenign ")
        try {
            
            const dude =    await Api.post('/admin/enrollstudents', {
                    grade_id: grd._id,
                    studentIds : stud,
                    school_id: studentList.school[0]
                })
                console.log(dude)
                console.log({dude : studentList , jc : "just checking "})
            const gradeIndex = studentList.grades.findIndex(obj => {

                return obj.grade._id.toString() === grd._id.toString()
            })
            console.log(studentList.grades[gradeIndex])
            const studentIndex = studentList.grades[gradeIndex].students.findIndex(obj => {
                return obj.student.toString() === stud.toString()
            })
            const newStudentList = {
                ...studentList
            }
            newStudentList.grades[gradeIndex].students.splice(studentIndex)
            
        //     console.log({obj : newStudentList , message : studentList})
        //     if(!newStudentList[0]){ return "not working"}
            setStudentList(newStudentList)
            } catch (error) {
              console.log(error)
            }
    }
    const [schoolInfo, setSchoolInfo] = useState();
    const formHelper = async ({ school_id }) => {
        try {
            const helper = await Api.post('/admin/formhelper', { school_id: school_id })
            console.log(helper.data)
            if (helper) {
                setSchoolInfo(helper)
                console.log({data : schoolInfo , message : "context state"})
                
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <ContextProvider.Provider value={{
            grade: grades, 
            getGrade: getGrade,
            studentList : studentList,
            getApplicants: getApplicants,
            enrollhandler: enrollhandler,
            schoolInfo: schoolInfo, 
            formHelper: formHelper
        }}  >
                {children}
        </ContextProvider.Provider >
    )
   
}