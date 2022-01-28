import { Email, LocationOn, PersonOutline, PhoneAndroid , Contacts} from '@mui/icons-material';
import { Grid , Backdrop, Button} from '@mui/material';
import React from 'react';
import './userInfo.css'
function UserInfo({ xs = 12, md = 6, lg = 6, popupHandler , popupState }) {
 
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer = 11 }}
                open={popupState}
                onClick={()=>{popupHandler()}}
            ></Backdrop>
        <div className="userInfo">
            <div className='userInfoContainer'>
                <h2 className="popupHeader">
                    Student Info
                </h2>
                <Grid container spacing={3}>
                    <Grid item xs={xs} sm={6}md={md} lg={lg}>
                        <div className="userInfoLabel">
                                <PersonOutline className='userInfoIcons'/>
                                <h3 className="dullLabel userInfoLabelName ">User</h3>
                        </div>
                        <div className="leftUserInfo">
                            <div className="">
                                <span className="userInfoFirstname">
                                    Amanuael
                                </span>
                                <span className="userInfoFathername">
                                    Mulat
                                </span>
                            </div>
                            
                            <div className="userInfoSpan"><span className="userInfoGender">Male</span><span className="age">23</span></div>
                            <div className="userInfoSpan"><p className="userInfoDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam maxime ipsa excepturi nobis? Expedita, tempora.</p></div>
                        </div>
                    </Grid>
                    <Grid item xs={xs} md={md} lg={lg}>
                        <div className="userInfoLabel">
                            <Contacts className='userInfoIcons'/>
                            <h3 className="dullLabel userInfoLabelName ">Address</h3>
                        </div>
                        <div className="rightUserInfo">
                            <div className="userInfoSpan">
                                <PhoneAndroid className= "userInfoIconsBold"/>
                                <span className="email">+251 918 27 88 29</span>
                            </div>
                            <div className="userInfoSpan">
                                <Email className= "userInfoIconsBold"/>
                                <span className="email">atgmulat@gmail.com</span>
                            </div>
                            <div className="userInfoSpan">
                                <LocationOn className= "userInfoIconsBold"/>
                                <span className="email">Addis Ababa, Ethiopia</span>
                            </div>
                            
                        </div>
                        </Grid>
                        
                </Grid>
                <div className="userInfoSpanButton">
                    <Button color ="success">Accept</Button>
                    <Button onClick={()=>{popupHandler()}}  >Cancel</Button>
                    <Button  color ="error">Decline</Button>
                </div>
            </div>
        </div>
    </div>
            
    );
}

export default UserInfo;
