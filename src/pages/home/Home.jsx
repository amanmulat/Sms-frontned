import FeaturedGrade from '../../components/featuredgrade/FeaturedGrade'
import './home.css'
import {useEffect, useState} from 'react'
import {useGrade} from '../../context/context'
import { Button, Collapse } from '@mui/material'
import CreateGrade from '../../components/grade/createGrade/CreateGrade'
import { QueryCache, useQueryClient } from 'react-query'

function Home() {
    const grades = useGrade().grade
    const getthegrades = useGrade().getGrade
    const [createGrade, setCreateGrade] = useState(false);
    const createGradeHandler = () => {
        setCreateGrade(!createGrade)
    }
    const queryClient = useQueryClient()
   
    useEffect(() => {
        if (!grades) {
            getthegrades()
        }
    }, [])
    const query = queryClient.getQueriesData(["getcampus"])
    console.log(query)
    return (
        <div className="home">
            <h2 className="featuredYear">2022</h2>
            <div className="createGradeButtonContainer"><Button className="createGradeButton" onClick={createGradeHandler}>{createGrade ? "Close" : "Create New Grade"}</Button> </div>
            <Collapse in={createGrade}>
                 <CreateGrade/>
            </Collapse>
            {grades && <FeaturedGrade list={grades} gradeList />}
        </div>
    )
}

export default Home
