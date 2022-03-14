import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useLocation } from 'react-router-dom'
import { Api } from '../../../api/api'
import RoomCards from '../../card/roomCard/RoomCard'
import './campusInfo.css'
function CampusInfo() {
  //useLocation
  const location = useLocation()
  const campuss = location.state.campus
  const splitLocation = location.pathname.split('/')
  console.log(splitLocation[2])
  //function
    const getCampus = async () => {
      return Api.get("/admin/getcamp", { params: { school_id: "61ea9c3a1f5d693176b5d5df" } }).then(
          res => res.data
        )
    }
  //query
 
  let thecamp
  const { data, status, error } = useQuery("getcampus", getCampus)
  if (!error && campuss && data) {
    console.log(campuss._id + " this works")
    // console.log(data.campus)
     thecamp = data.campus.find(obj => {
      return obj._id === campuss._id 
    })
  }
 

  return (
    <div className='campusInfo'>
      {thecamp && 
        <div className="campusInfoContainer shadow">
          <h2 className="gradeInfoTitle">
            Campus Info
          </h2>
        
          <div className="gradeInfoItem">
            <p className="gradeInfoLable">
              Branch
            </p>
            <p className="gradeInfoValue">
              {thecamp.name}
            </p>
          </div>
          <div className="campusRooms">
            <RoomCards roomList={thecamp.classrooms} campusId= {thecamp._id} xs={12} md={6} lg={6} title={"Rooms"}/>
          </div>
      </div>
      }
      
    </div>
  )
}

export default CampusInfo