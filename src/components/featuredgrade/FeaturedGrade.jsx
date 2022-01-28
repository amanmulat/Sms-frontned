import "./featuredGrade.css"
import Card from '../card/Card';
import { Grid } from "@mui/material";

function FeaturedGrade({ list, xs = 12, md = 6, lg = 4, studentList, gradeList ,another }) {
   
    
    return (
        <div className='featured'>
         <h2 className="featuredYear">2022</h2>
            <Grid container spacing={3}>
                
                {list && list.map( listitem => {
                    return (
                        <Grid item xs={xs} md={md} lg={lg}>
                            {gradeList &&
                                <Card
                                    title={listitem.grade}
                                    list={listitem}
                                    campus={listitem.campus.name}
                                    button />}
                            {studentList &&
                                <Card title={listitem.grade.grade}
                                    list={listitem}
                                    campus={listitem.grade.campus.name}
                                    applicantlist={listitem.students} />}
                        </Grid>)
                })}
                
            </Grid>
                
        </div>
    )
}

export default FeaturedGrade
