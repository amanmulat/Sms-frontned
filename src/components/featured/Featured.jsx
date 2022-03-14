import { Grid } from '@mui/material'
import React from 'react'
import CampusCard from '../card/CampusCard.jsx'
import "./featured.css"
function FeaturedCampus({list  , title ,  xs = 12, md = 6, lg = 6, }) {
   

  return (
      <div className='featuredCampus'>
                  
          {title && <h2 className="featuredTitle">
              {title}
          </h2>}
          <Grid container spacing={3}>
              {list?.campus.map(campus => {
                      return (
                          <Grid item xs={xs} md={md} lg={lg}>
                             {campus &&  <CampusCard key={campus._id} campus={campus}/>}
                          </Grid>
                      )
                  }
                  )
                }
            </Grid>    
                
      </div>
  )
}

export default FeaturedCampus