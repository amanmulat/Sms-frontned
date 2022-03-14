import "./card.css"

import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Check, Clear , Info} from '@mui/icons-material';
import {  useState } from "react";
import UserInfo from "../userinfo/UserInfo";
import { useGrade } from "../../context/context";


function Card({ title, campus, list, button, applicantlist }) {
    

    const enrollhandler = useGrade().enrollhandler
    const [popup, setPopup] = useState(false)
    const popupHandler = () => {
        setPopup(!popup)
    }
    return (
        <div className="card shadow">
            <div className="cardTitleContainer">
                <h3 className="cardTitleLabel">Grade</h3>
                <span className="cardTitle">{title}</span>
            </div>
            
            {popup && <UserInfo popupHandler={popupHandler} popupState={ popup}/>}
            <div className="campus">
                {campus}
            </div>
            {applicantlist &&
                applicantlist.map(applicationItem => {
                    return (
                        <div>
                            <ul className="applicantlist">
                                <li className="applicantlistitem">
                                    <p className="applicantName">
                                        {applicationItem.student.first_name} 
                                    </p>
                                    <span className="applicantButton">
                                        <Check className="applicantButtonCheck" onClick={()=>{enrollhandler({stud : applicationItem.student._id , grd : list.grade })} }/>
                                        <Info className="applicantButtonInfo" onClick={popupHandler }/>
                                        <Clear className="applicantButtonClear"/>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    )
                })
                }
            {
            button && 
            <div className="cardButton">
                <Link className="link"
                    to={"/grade/" + list._id}
                    state = {{grade : list }}
                >
                    <Button >More</Button>
                </Link>
            </div>
            }

        </div>
    )
}

export default Card
