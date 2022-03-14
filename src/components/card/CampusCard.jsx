import { Button } from '@mui/material'
import { Link } from "react-router-dom";
import React from 'react'

function CampusCard({campus}) {
  return (
      <div className='card shadow'>
        <div className="cardTitleContainer">
            <h3 className="cardTitleLabel">Campus</h3>
            <span className="cardTitle">{campus.name}</span>
      </div>
      <div className="cardButton">
        <Link
          className='link'
          to={"/managecampus/" + campus._id}
          state = {{campus : campus }}
        >
          <Button>
            More
          </Button>
        </Link>
      </div>
      </div>
  )
}

export default CampusCard