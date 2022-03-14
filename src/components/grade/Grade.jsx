import { useLocation } from "react-router-dom"
import "./grade.css"
import GradeInfo from "./gradeInfo/GradeInfo"
import SubjectBar from "./subjectbar/SubjectBar"
function Grade() {
    const location = useLocation()
    const grade = location.state.grade
    
    return (
        <div className="grade">
            <GradeInfo
                gradeTitle={grade.grade}
                year={grade.year.Year}
                students={grade.enrolledstudents}
                campus={grade.campus.name}
            />
            <SubjectBar subject={grade.subject }/>
        </div>
    )
}

export default Grade
