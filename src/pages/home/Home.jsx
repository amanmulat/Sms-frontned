import FeaturedGrade from '../../components/featuredgrade/FeaturedGrade'
import './home.css'
import {useEffect} from 'react'
import {useGrade} from '../../context/context'

function Home() {
    const grades = useGrade().grade
    const getthegrades = useGrade().getGrade
    
    useEffect(() => {
        getthegrades()
    }, [])
    return (
        <div className="home">
            {grades && <FeaturedGrade list={grades} gradeList />}
        </div>
    )
}

export default Home
